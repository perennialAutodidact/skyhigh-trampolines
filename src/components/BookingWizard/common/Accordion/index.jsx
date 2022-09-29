import React from "react";

const Accordion = ({ children, accordionId }) => {
  return (
    <div className="accordion accordion-flush" id={accordionId}>
      {children}
    </div>
  );
};

export default Accordion;
