import React, { useState, useLayoutEffect, useRef } from "react";
import IntroSection from "./IntroSection";
import KGSection from "./KGSection";
import TechStackSection from "./TechStackSection";
import WizardSection from "./WizardSection";
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
          <WizardSection />
        </div>
      </div>
    </>
  );
};
export default AboutPage;
