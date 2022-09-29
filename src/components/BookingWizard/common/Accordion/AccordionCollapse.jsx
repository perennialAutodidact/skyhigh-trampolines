import React from "react";

const AccordionCollapse = ({ children, collapseId }) => {
  return (
    <div
      id={`accordion-collapse-${collapseId}`}
      className="accordion-collapse collapse show"
      aria-labelledby={`accordion-header-${collapseId}`}
    >
      <div className="accordion-body container-fluid px-3">{children}</div>
    </div>
  );
};

export default AccordionCollapse;
