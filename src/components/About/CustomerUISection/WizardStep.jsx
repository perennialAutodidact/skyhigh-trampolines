import React from "react";
import NumberCircle from "./NumberCircle";

const WizardStep = ({ number, headerText }) => {
  return (
    <div className="row mb-5">
      <div
        className={`
          col-12 col-md-6 
          offset-md-${number % 2 === 0 ? 4 : 2} 
          d-flex flex-column gap-3
          justify-content-end
          ${number % 2 === 0 ? "align-items-end" : ""}
        `}
      >
        <div className="d-flex gap-2 align-items-end">
          <div className={`order-${number % 2 === 0 ? 2 : 1}`}>
            <NumberCircle number={number} />
          </div>
          <h3 id="header" className={`m-0 order-${number % 2 === 0 ? 1 : 2}`}>
            {headerText}
          </h3>
        </div>
        <img
          id={`step-${number}-img`}
          src={`images/wizardStep${number}.png`}
          alt={`wizard form step ${number}`}
          width="100%"
        />
      </div>
    </div>
  );
};

export default WizardStep;
