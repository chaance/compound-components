import React from "react";
import "./Accordion.css";

////////////////////////////////////////////////////////////////////////////////

export function Accordion({ children, index, onChange, data, ...props }) {
  return (
    <div {...props} data-accordion="">
      {data.map((accordionItem, itemIndex) => {
        let state = index === itemIndex ? "open" : "closed";
        return (
          <AccordionItem
            key={accordionItem.buttonText}
            accordionData={data}
            itemData={accordionItem}
            index={itemIndex}
            state={state}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
}

export function AccordionItem({
  index,
  state,
  accordionData,
  itemData,
  onChange,
  ...props
}) {
  function handleClick(event) {
    event.preventDefault();
    onChange(index);
  }

  return (
    <div {...props} data-accordion-item="" data-state={state}>
      <button ref={itemData.ref} data-accordion-button="" onClick={handleClick}>
        {itemData.buttonText}
      </button>
      <div hidden={state !== "open"} data-accordion-panel="" data-state={state}>
        {itemData.panelText}
      </div>
    </div>
  );
}
