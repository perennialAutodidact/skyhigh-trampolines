import React from "react";
import WizardStep from "./WizardStep";

const CustomerUISection = () => {
  return (
    <div id="wizard-section" className="container-fluid">
      <div className="row">
        <h1
          id="customer-ui-header"
          className="display-3 ps-md-5"
        >
          Customer UI
        </h1>
        <div className="col-12 col-md-8 mb-5">
          <p 
            id="p1" 
            className="fs-2 ps-md-5"
          >
            The customer UI consists of a{" "}
            <span className="fw-bold text-primary">home page</span> and a{" "}
            <span className="fw-bold text-primary">six-part wizard form</span>{" "}
            for creating new bookings.
          </p>
        </div>
      </div>
      <div className="row">
        <h2
          id="booking-wizard-header"
          className="display-4 text-center"
        >
          Booking Wizard
        </h2>
        <div className="container mt-5">
          {wizardSteps.map(({ number, headerText }) => (
            <WizardStep
              number={number}
              headerText={headerText}
              key={number}
            />
          ))}
        </div>
      </div>
    </div>
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

export default CustomerUISection;
