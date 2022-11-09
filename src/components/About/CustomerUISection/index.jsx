import React, { useLayoutEffect, useRef, useMemo } from "react";
import WizardStep from "./WizardStep";
import gsap from "gsap";

const CustomerUISection = () => {
  const ref1 = useRef();
  const stepRefs = useRef([]);
  const tl1 = useRef();
  const tl2 = useRef();
  const ctx2 = useMemo(()=>gsap.context(()=>{}, ref2), [ref2])

  const addToRefs = el => {
    if(el && !stepRefs.current.contains(el)){
      stepRefs.current.push(el)
    }
  }


  useLayoutEffect(() => {
    const selector = gsap.utils.selector(ref1);
    const customerUIHeader = selector("#customer-ui-header");
    const p1 = selector("#p1");

    // let ctx1 = gsap.context(() => {
      // tl1.current = gsap.timeline({
      //   defaults: {
      //     ease: "power2.out",
      //   },
      //   label: "ctx1",
      //   scrollTrigger: {
      //     trigger: ref1.current,
      //     start: "top 70%",
      //     end: "+= 200",
      //     // markers: {
      //     //   indent: 500,
      //     // },
      //   },
      // });

      // tl1.current
      //   .set(customerUIHeader, { opacity: 0, x: -200 })
      //   .set(p1, { opacity: 0, x: -200 });

      // tl1.current
      //   .to(customerUIHeader, {
      //     autoAlpha: 1,
      //     x: 0,
      //     duration: 1,
      //   })
      //   .to(
      //     p1,
      //     {
      //       autoAlpha: 1,
      //       x: 0,
      //       duration: 1,
      //     },
      //     "-=0.5"
      //   );
    // }, ref1);

    // let ctx2 = gsap.context(() => {
      // const selector = gsap.utils.selector(ref2);
      // const bookingWizardHeader = selector("#booking-wizard-header");

      // tl2.current = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: ref2.current,
      //     start: "top 50%",
      //     end: "+=200",
      //     markers: {
      //       startColor: "#00FFFF",
      //       endColor: "#00FFFF",
      //       indent: 400,
      //     },
      //   },
      // });
      // tl2.current.set(bookingWizardHeader, { opacity: 0, y: -200 });
      // tl2.current.to(bookingWizardHeader, {
      //   autoAlpha: 1,
      //   y: 0,
      // });
    // }, ref2);



    return () => {
      // ctx1.revert();
      // ctx2.revert();
    };
  }, []);

  return (
    <div id="wizard-section" className="container-fluid">
      <div className="row" ref={ref1}>
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
          // ref={ref2}
          id="booking-wizard-header"
          className="display-4 text-center"
          style={{ visibility: "hidden" }}
        >
          Booking Wizard
        </h2>
        <div className="container mt-5">
          {wizardSteps.map(({ number, headerText }) => (
            <div className="row" ref={addToRefs}>

            <WizardStep
              number={number}
              headerText={headerText}
              ctx={ctx2}
              // ref={ref2}
              key={number}
              />
              </div>
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
