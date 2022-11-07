import React, { useState, useLayoutEffect, useRef } from "react";
import WizardStep from "./WizardStep";
import IntroSection from "./IntroSection";
import KGSection from "./KGSection";
import TechStackSection from "./TechStackSection";
import gsap from "gsap";

const AboutPage = () => {
  const [tl, setTl] = useState(gsap.timeline());

  return (
    <>
      <IntroSection tl={tl} />
      <KGSection tl={tl} />
      <TechStackSection />

      <div className="container-fluid">
        <div className="row">
          <h1 className="display-3 ps-md-5">Customer UI</h1>
          <div className="col-12 col-md-8 mb-5">
            <p className="fs-2 ps-md-5">
              The customer UI consists of a{" "}
              <span className="fw-bold text-primary">home page</span> and a{" "}
              <span className="fw-bold text-primary">six-part wizard form</span>{" "}
              for creating new bookings.
            </p>
          </div>
          <h2 className="display-4 text-center">Wizard Form</h2>
          <div className="container mt-5">
            {wizardSteps.map(({ number, headerText }) => (
              <WizardStep number={number} headerText={headerText} />
            ))}
          </div>
        </div>
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

export default AboutPage;
