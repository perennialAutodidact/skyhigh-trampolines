import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useOnLoadImages } from "hooks/useOnLoadImages";
import ScreenshotList from "../ScreenshotList";
import { wizardScreenshots } from "./wizardScreenshots";
import { fadeInFromSide } from "../ScreenshotList/animations";

const CustomerUISection = () => {
  const ref = useRef();
  const stepRefs = useRef([]);
  const tl = useRef();
  const imagesLoaded = useOnLoadImages(ref);

  const addToRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    if (imagesLoaded) {
      const selector = gsap.utils.selector(ref);
      const customerUIHeader = selector("#customer-ui-header");
      const p1 = selector("#p1");
      const bookingWizardHeader = selector("#booking-wizard-header");

      let ctx1 = gsap.context(() => {
        tl.current = gsap.timeline({
          defaults: {
            ease: "power2.out",
          },
          scrollTrigger: {
            trigger: ref.current,
            start: "top center+=100",
          },
        });

        tl.current
          .add(fadeInFromSide(customerUIHeader, -100, 0.5))
          .add(fadeInFromSide(p1, -100, 0.5), "-=0.3")
          .add(fadeInFromSide(bookingWizardHeader, -100, 0.75));

        stepRefs.current.forEach((el, index) => {
          let numberCircle = el.querySelector(`#number-circle`);
          let header = el.querySelector(`#header`);
          let stepImg = el.querySelector(`#screenshot`);
          let elements = [numberCircle, header, stepImg];

          let startX = (index + 1) % 2 === 1 ? 100 : -100;
          let duration = 0.75;
          let delay = duration * 0.6;
          let _tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: `top center+=100`,
            },
          });
          elements.forEach((el) => {
            _tl.add(fadeInFromSide(el, startX, duration), `-=${delay}`);
          });
        });
      }, ref);
      return () => {
        ctx1.revert();
      };
    }
  }, [imagesLoaded]);

  return (
    <section id="wizard-section" className="container-fluid" ref={ref}>
      <div className="row">
        <h1
          id="customer-ui-header"
          className="display-3 ps-md-5"
          style={{ visibility: "hidden" }}
        >
          Customer UI
        </h1>
        <div className="col-12 col-md-8 mb-5 p-0">
          <p id="p1" className="fs-2 ps-md-5" style={{ visibility: "hidden" }}>
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
          style={{ visibility: "hidden" }}
        >
          Booking Wizard
        </h2>

        <ScreenshotList
          screenshots={wizardScreenshots}
          refAdder={addToRefs}
          refList={stepRefs}
        />
      </div>
    </section>
  );
};

export default CustomerUISection;
