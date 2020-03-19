import React from "react";
import { useId } from "@reach/auto-id";
import "./Accordion.css";

////////////////////////////////////////////////////////////////////////////////

export function Accordion({ children, index, onChange, data, ...props }) {
  let id = useId(props.id);

  return (
    <div {...props} data-accordion="">
      {data.map((accordionItem, itemIndex) => {
        let state = index === itemIndex ? "open" : "closed";
        return (
          <AccordionItem
            accordionId={id}
            accordionData={data}
            itemData={accordionItem}
            index={itemIndex}
            state={state}
            onChange={onChange}
            onSelectPanel={(newIndex, triggerNode) => {
              triggerNode && triggerNode.focus();
              onChange(newIndex);
            }}
          />
        );
      })}
    </div>
  );
}

export function AccordionItem({
  accordionId,
  index,
  state,
  accordionData,
  itemData,
  onChange,
  onSelectPanel,
  ...props
}) {
  // We need unique IDs for the panel and button to point to one another
  let itemId = `${accordionId}-${index}`;
  let panelId = `panel-${itemId}`;
  let buttonId = `button-${itemId}`;

  function handleKeyDown(event) {
    let navIndex = -1;

    function getNextIndex() {
      let atBottom = index === accordionData.length - 1;
      return atBottom ? getFirstIndex() : (index + 1) % accordionData.length;
    }

    function getPreviousIndex() {
      let atTop = index === 0;
      return atTop
        ? getLastIndex()
        : (index - 1 + accordionData.length) % accordionData.length;
    }

    function getFirstIndex() {
      return 0;
    }

    function getLastIndex() {
      return accordionData.length - 1;
    }

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        navIndex = getPreviousIndex();
        break;
      case "ArrowDown":
        event.preventDefault();
        navIndex = getNextIndex();
        break;
      case "PageUp":
        event.preventDefault();
        navIndex = (event.ctrlKey ? getPreviousIndex : getFirstIndex)();
        break;
      case "PageDown":
        event.preventDefault();
        navIndex = (event.ctrlKey ? getNextIndex : getLastIndex)();
        break;
      case "Home":
        event.preventDefault();
        navIndex = getFirstIndex();
        break;
      case "End":
        event.preventDefault();
        navIndex = getLastIndex();
        break;
      default:
        break;
    }

    if (navIndex > -1) {
      // eslint-disable-next-line no-unused-expressions
      accordionData[navIndex]?.ref?.current?.focus();
    }
  }

  function handleClick(event) {
    event.preventDefault();
    onSelectPanel(index, itemData.ref.current);
  }

  return (
    <div {...props} data-accordion-item="" data-state={state}>
      <button
        aria-controls={panelId}
        aria-expanded={state === "open"}
        ref={itemData.ref}
        data-accordion-button=""
        id={buttonId}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {itemData.buttonText}
      </button>
      <div
        hidden={state !== "open"}
        role="region"
        aria-labelledby={buttonId}
        data-accordion-panel=""
        data-state={state}
        id={panelId}
        tabIndex={-1}
      >
        {itemData.panelText}
      </div>
    </div>
  );
}
