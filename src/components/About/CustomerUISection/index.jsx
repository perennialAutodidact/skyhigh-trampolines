import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useOnLoadImages } from "hooks/useOnLoadImages";
import ScreenshotList from "../ScreenshotList";
import { wizardScreenshots } from "./wizardScreenshots";

const CustomerUISection = () => {
  const ref = useRef();
  const stepRefs = useRef([]);
  stepRefs.current = [];
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
          .set(customerUIHeader, { x: -200 })
          .set(p1, { x: -200 })
          .set(bookingWizardHeader, { y: -200 });

        tl.current
          .to(customerUIHeader, {
            autoAlpha: 1,
            x: 0,
            duration: 1,
          })
          .to(
            p1,
            {
              autoAlpha: 1,
              x: 0,
              duration: 1,
            },
            "-=0.5"
          );

        stepRefs.current.forEach((el, index) => {
          let numberCircle = el.querySelector(`#number-circle`);
          let header = el.querySelector(`#header`);
          let stepImg = el.querySelector(`#screenshot`);

          let startX = (index + 1) % 2 === 1 ? 200 : -200;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: el,
                start: "top center+=200",
              },
            })
            .to(bookingWizardHeader, { autoAlpha: 1, y: 0 })
            .fromTo(
              numberCircle,
              { autoAlpha: 0, x: startX },
              { x: 0, autoAlpha: 1, duration: 1 }
            )
            .fromTo(
              header,
              {
                x: startX,
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.75,
              },
              "-=0.75"
            )
            .to(
              stepImg,
              {
                autoAlpha: 1,
                duration: 1,
              },
              "-=0.75"
            );
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
        <div className="col-12 col-md-8 mb-5">
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

        <ScreenshotList screenshots={wizardScreenshots} refAdder={addToRefs} />
      </div>
    </section>
  );
};

export default CustomerUISection;
