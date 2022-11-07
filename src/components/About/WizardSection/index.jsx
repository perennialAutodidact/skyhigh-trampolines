import React from "react";
import WizardStep from "./WizardStep";

const WizardSection = () => {
  return (
    <>
      <h2 className="display-4 text-center">Wizard Form</h2>
      <div className="container mt-5">
        {wizardSteps.map(({ number, headerText }) => (
          <WizardStep number={number} headerText={headerText} />
        ))}
      </div>
    </>
  );
};

const wizardSteps = [
  {
    number: 1,
    headerText: "Select Date",
  },
  {
    number: 2,
    headerText: "Select Products",
  },
  {
    number: 3,
    headerText: "Select Add-Ons",
  },
  {
    number: 4,
    headerText: "Customer Details",
  },
  {
    number: 5,
    headerText: "Sign the Waiver",
  },
  {
    number: 6,
    headerText: "Payment Details",
  },
];

export default WizardSection;
