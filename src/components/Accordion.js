import React, { createContext, useContext, useRef } from "react";
import { useId } from "@reach/auto-id";
import {
  useDescendant,
  useDescendants,
  createDescendantContext
} from "../utils/descendants";
import "./Accordion.css";

const DescendantContext = createDescendantContext();
const AccordionContext = createContext();
const AccordionItemContext = createContext();
const useDescendantContext = () => useContext(DescendantContext);
const useAccordionContext = () => useContext(AccordionContext);
const useAccordionItemContext = () => useContext(AccordionItemContext);

////////////////////////////////////////////////////////////////////////////////

export function Accordion({ children, index, onChange, ...props }) {
  let id = useId(props.id);
  let [items, setItems] = useDescendants();

  let context = {
    accordionId: id,
    accordionIndex: index,
    onChange,
    onSelectPanel(newIndex, triggerNode) {
      triggerNode && triggerNode.focus();
      onChange(newIndex);
    }
  };

  return (
    <DescendantContext.DescendantProvider items={items} set={setItems}>
      <AccordionContext.Provider value={context}>
        <div {...props} data-accordion="">
          {children}
        </div>
      </AccordionContext.Provider>
    </DescendantContext.DescendantProvider>
  );
}

export function AccordionItem({ children, ...props }) {
  let { accordionId, accordionIndex } = useAccordionContext();
  let buttonRef = useRef(null);

  let index = useDescendant({
    context: DescendantContext,
    element: buttonRef.current
  });

  // We need unique IDs for the panel and button to point to one another
  let itemId = `${accordionId}-${index}`;
  let panelId = `panel-${itemId}`;
  let buttonId = `button-${itemId}`;

  let state = accordionIndex === index ? "open" : "closed";

  let context = {
    buttonId,
    index,
    itemId,
    buttonRef,
    panelId,
    state
  };

  return (
    <AccordionItemContext.Provider value={context}>
      <div {...props} data-accordion-item="" data-state={state}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

////////////////////////////////////////////////////////////////////////////////

export function AccordionButton({
  children,
  onClick,
  onKeyDown,
  tabIndex,
  headingLevel,
  ...props
}) {
  let { descendants: accordionItems } = useDescendantContext();
  let { onSelectPanel } = useAccordionContext();

  let {
    buttonId,
    buttonRef: ref,
    index,
    panelId,
    state
  } = useAccordionItemContext();

  function handleClick(event) {
    event.preventDefault();
    onSelectPanel(index, ref.current);
  }

  function handleKeyDown(event) {
    let navIndex = -1;

    function getNextOption() {
      let atBottom = index === accordionItems.length - 1;
      return atBottom
        ? getFirstOption()
        : accordionItems[(index + 1) % accordionItems.length];
    }

    function getPreviousOption() {
      let atTop = index === 0;
      return atTop
        ? getLastOption()
        : accordionItems[
            (index - 1 + accordionItems.length) % accordionItems.length
          ];
    }

    function getFirstOption() {
      return accordionItems[0];
    }

    function getLastOption() {
      return accordionItems[accordionItems.length - 1];
    }

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        let prev = getPreviousOption();
        navIndex = prev ? prev.index : -1;
        break;
      case "ArrowDown":
        event.preventDefault();
        let next = getNextOption();
        navIndex = next ? next.index : -1;
        break;
      case "PageUp":
        event.preventDefault();
        let prevOrFirst = (event.ctrlKey
          ? getPreviousOption
          : getFirstOption)();
        navIndex = prevOrFirst ? prevOrFirst.index : -1;
        break;
      case "PageDown":
        event.preventDefault();
        let nextOrLast = (event.ctrlKey ? getNextOption : getLastOption)();
        navIndex = nextOrLast ? nextOrLast.index : -1;
        break;
      case "Home":
        event.preventDefault();
        let first = getFirstOption();
        navIndex = first ? first.index : -1;
        break;
      case "End":
        event.preventDefault();
        let last = getLastOption();
        navIndex = last ? last.index : -1;
        break;
      default:
        break;
    }

    if (navIndex > -1) {
      // eslint-disable-next-line no-unused-expressions
      accordionItems[navIndex].element?.focus();
    }
  }

  return (
    <H level={headingLevel} data-accordion-heading="">
      <button
        aria-controls={panelId}
        aria-expanded={state === "open"}
        {...props}
        ref={ref}
        data-accordion-button=""
        id={buttonId}
        onClick={wrapEvent(onClick, handleClick)}
        onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
      >
        {children}
      </button>
    </H>
  );
}

////////////////////////////////////////////////////////////////////////////////

export function AccordionPanel({ as: Comp = "div", children, ...props }) {
  const { panelId, buttonId, state } = useAccordionItemContext();

  return (
    <Comp
      hidden={state !== "open"}
      role="region"
      aria-labelledby={buttonId}
      {...props}
      data-accordion-panel=""
      data-state={state}
      id={panelId}
      tabIndex={-1}
    >
      {children}
    </Comp>
  );
}

////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps a lib-defined event handler and a user-defined event handler, returning
 * a single handler that allows a user to prevent lib-defined handlers from
 * firing.
 *
 * @param {Function} theirHandler User-supplied event handler
 * @param {Function} ourHandler Library-supplied event handler
 */
function wrapEvent(theirHandler, ourHandler) {
  return event => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
}

function H({ level = 2, ...props }) {
  let Comp = `h${level}`;
  return <Comp {...props} />;
}
