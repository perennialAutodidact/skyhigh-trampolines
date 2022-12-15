import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useOnLoadImages } from "hooks/useOnLoadImages";
import ScreenshotList from "../ScreenshotList";
import { wizardScreenshots } from "./wizardScreenshots";
import { animateRefList, fadeInFromSide } from "../ScreenshotList/animations";

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

      let duration = 0.75;
      let ctx1 = gsap.context(() => {
        tl.current = gsap.timeline({
          defaults: {
            ease: "power2.out",
          },
          scrollTrigger: {
            trigger: ref.current,
            start: "top center+=200",
          },
        });

        tl.current
          .add(fadeInFromSide(customerUIHeader, { startX: -100, duration }))
          .add(fadeInFromSide(p1, { startX: -100, duration }), "-=0.3")
          .add(
            fadeInFromSide(bookingWizardHeader, {
              startX: -100,
              duration,
            })
          );

        let subElementIds = ["#number-circle", "#header", "#screenshot"];
        let staggerDelay = `-=${duration * 0.6}`;

        // build an options object  for each sub-element in the ref list
        let animationOptions = stepRefs.current.map((el, i) => ({
          duration,
          startX: i % 2 === 0 ? 200 : -200,
        }));

        animateRefList(
          stepRefs,
          subElementIds,
          fadeInFromSide,
          animationOptions,
          staggerDelay
        );
      }, ref);
      return () => {
        ctx1.revert();
      };
    }
  }, [imagesLoaded]);

  return (
    <section id="wizard-section" className="container-fluid" ref={ref}>
      <div className="row bg-disabled py-4">
        <h1
          id="customer-ui-header"
          className="display-3 ps-md-5"
          style={{ visibility: "hidden" }}
        >
          Customer UI
        </h1>
        <div className="col-12 col-md-8 p-0">
          <p
            id="p1"
            className="fs-2 ps-3 ps-md-5"
            style={{ visibility: "hidden" }}
          >
            The customer UI consists of a{" "}
            <span className="fw-bold text-primary">home page</span> and a{" "}
            <span className="fw-bold text-primary">six-part wizard form</span>{" "}
            for creating new bookings.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 mt-3">
          <h2
            id="booking-wizard-header"
            className="display-4 m-0"
            style={{ visibility: "hidden" }}
          >
            Booking Wizard
          </h2>
        </div>

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
