// If you're curious about what's going on here and why we're doing this,
// check out a thorough write-up in the internal package we use for
// Reach UI.
// https://github.com/reach/reach-ui/blob/master/packages/descendants/README.md

// WARNING: @reach/descedants is INTERNAL and not recommended for direct outside
// use. Our approach here will almost certainly change along with the API,
// without regard to semver rules. You've been warned :)

import React, {
  createContext,
  useLayoutEffect,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

function noop() {}

/**
 * Initializer for our descendants context.
 * @param {*} initialValue initial context value
 * @returns {React.Context} context object
 */
export function createDescendantContext(name, initialValue = {}) {
  let DescendantContext = createContext({
    descendants: [],
    registerDescendant: noop,
    unregisterDescendant: noop,
    ...initialValue
  });
  let DescendantProvider = createDescendantProvider(DescendantContext);
  DescendantProvider.displayName = `${name}Provider`;
  DescendantContext.displayName = name;
  DescendantContext.DescendantProvider = DescendantProvider;
  return DescendantContext;
}

/**
 *
 * @param {Descendant} descendant
 * @param {*} indexProp
 */
export function useDescendant({ context, element, ...rest }) {
  let [, forceUpdate] = useState();
  let { registerDescendant, unregisterDescendant, descendants } = useContext(
    context
  );

  // Prevent any flashing
  useLayoutEffect(() => {
    if (!element) forceUpdate({});
    registerDescendant({ element, ...rest });
    return () => unregisterDescendant(element);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, ...Object.values(rest)]);

  return descendants.findIndex(item => item.element === element);
}

export function useDescendants() {
  return useState([]);
}

function createDescendantProvider(Ctx) {
  return function DescendantProvider({ children, items, set }) {
    let registerDescendant = React.useCallback(
      ({ element, ...rest }) => {
        if (!element) {
          return;
        }

        set(items => {
          let newItem;
          let newItems;
          // If there are no items, register at index 0 and bail.
          if (items.length === 0) {
            newItem = {
              element,
              index: 0,
              ...rest
            };
            newItems = [...items, newItem];
          } else if (items.find(item => item.element === element)) {
            // If the element is already registered, just use the same array
            newItems = items;
          } else {
            // When registering a descendant, we need to make sure we insert in
            // into the array in the same order that it appears in the DOM. So as
            // new descendants are added or maybe some are removed, we always know
            // that the array is up-to-date and correct.
            //
            // So here we look at our registered descendants and see if the new
            // element we are adding appears earlier than an existing descendant's
            // DOM node via `node.compareDocumentPosition`. If it does, we insert
            // the new element at this index. Because `registerDescendant` will be
            // called in an effect every time the descendants state value changes,
            // we should be sure that this index is accurate when descendent
            // elements come or go from our component.
            let index = items.findIndex(item => {
              if (!item.element || !element) {
                return false;
              }
              // Does this element's DOM node appear before another item in the
              // array in our DOM tree? If so, return true to grab the index at
              // this point in the array so we know where to insert the new
              // element.
              return Boolean(
                item.element.compareDocumentPosition(element) &
                  Node.DOCUMENT_POSITION_PRECEDING
              );
            });

            newItem = {
              element,
              index,
              ...rest
            };

            // If an index is not found we will push the element to the end.
            if (index === -1) {
              newItems = [...items, newItem];
            } else {
              newItems = [
                ...items.slice(0, index),
                newItem,
                ...items.slice(index)
              ];
            }
          }
          return newItems.map((item, index) => ({ ...item, index }));
        });
      },
      // set is a state setter initialized by the useDescendants hook.
      // We can safely ignore the lint warning here because it will not change
      // between renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    let unregisterDescendant = useCallback(
      element => {
        if (!element) {
          return;
        }

        set(items => items.filter(item => element !== item.element));
      },
      // set is a state setter initialized by the useDescendants hook.
      // We can safely ignore the lint warning here because it will not change
      // between renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    const value = useMemo(() => {
      return {
        descendants: items,
        registerDescendant,
        unregisterDescendant
      };
    }, [items, registerDescendant, unregisterDescendant]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  };
}
