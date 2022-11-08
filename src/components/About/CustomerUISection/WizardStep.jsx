import React, { useLayoutEffect, useRef } from "react";
import NumberCircle from "./NumberCircle";
import { useWindowSize } from "hooks/useWindowSize";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const WizardStep = React.forwardRef(({ number, headerText }, ref) => {
  const { height: winHeight } = useWindowSize();
  const tl = useRef();

  useLayoutEffect(() => {
    const justifiedLOrR = parseInt(number) % 2 === 1 ? "L" : "R";

    const selector = gsap.utils.selector(ref);
    const numberCircle = selector(`#numberCircle-${number}`);
    const header = selector("#header");
    const stepImg = selector(`#step-${number}-img`);

    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          trigger: ref.current,
          start: `top 50%`,
          end: "+=1000",
          markers: {
            indent: 600,
            startColor: "#0F0F00",
            endColor: "#0F0F00",
          },
        },
      });

      let startX = justifiedLOrR === "L" ? 200 : -200;
      tl.current
        .set(numberCircle, {
          x: startX,
          opacity: 0,
        })
        .set(header, {
          x: startX,
          opacity: 0,
        })
        .set(stepImg, {
          x: -startX,
          opacity: 0,
        });

      tl.current
        .to(numberCircle, {
          x: 0,
          autoAlpha: 1,
          duration: 1,
        })
        .to(
          header,
          {
            x: 0,
            autoAlpha: 1,
            duration: 1,
          },
          "-=0.75"
        )
        .to(
          stepImg,
          {
            x: 0,
            autoAlpha: 1,
            duration: 1,
          },
          "-=0.75"
        );
    }, ref);
    // return () => ctx.revert();
  }, [number, winHeight, ref]);

  return (
    <div className="row mb-5" ref={ref}>
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
          <h3
            id="header"
            style={{ visibility: "hidden" }}
            className={`m-0 order-${number % 2 === 0 ? 1 : 2}`}
          >
            {headerText}
          </h3>
        </div>
        <img
          id={`step-${number}-img`}
          style={{ visibility: "hidden" }}
          src={`images/wizardStep${number}.png`}
          alt={`wizard form step ${number}`}
          width="100%"
        />
      </div>
    </div>
  );
});

export default WizardStep;
