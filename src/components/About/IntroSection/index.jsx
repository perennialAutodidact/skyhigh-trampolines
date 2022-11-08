import React, { useLayoutEffect, useRef } from "react";
import GithubDev from "./GithubDev";
import gsap from "gsap";

const IntroSection = () => {
  const ref = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    const selector = gsap.utils.selector(ref);
    const p1 = selector("#p1");
    const p2 = selector("#p2");
    const ghDevContainer = selector("#gh-dev-container");
    const ghDev = selector(".gh-dev");

    let ctx = gsap.context(() => {
      tl.current
        .fromTo(
          p1,
          { x: -500, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
        )
        .fromTo(
          p2,
          { x: 500, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ghDevContainer,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out", duration: 0.5 },
          "-=0.5"
        )
        .from(ghDev, {
          opacity: 0,
          y: -50,
          ease: "bounce.out",
          stagger: {
            amount: 0.66,
            each: 0.25,
          },
        });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="container-fluid py-3 py-lg-5 vh-75 overflow-hidden"
      ref={ref}
    >
      <div className="row gy-2 gy-lg-3 g-xl-2">
        <div className="col-12 col-md-8 ps-md-5">
          <p id="p1" className="fs-3 fs-lg-2">
            This app is a booking and content management system for{" "}
            <span className="fw-bold text-primary">Sky High Trampolines</span>,
            a hypothetical trampoline park.
          </p>
        </div>
        <div className="col-12 col-md-8 offset-md-4 pe-md-5 mb-xxl-0">
          <p id="p2" className="m-0 fs-2 fs-lg-2 text-end">
            The original project was the result of a collaboration between four
            international developers over a four-week period, with the goal to
            gain experience working remotely as a team.
          </p>
        </div>
      </div>
      <div id="gh-dev-container" className="row bg-info my-5 shadow">
        <div className="col-12 col-md-10 offset-md-1 bg-info p-5">
          <div className="container">
            <div className="row gy-5">
              <div className="col-6 col-md-3">
                <GithubDev
                  name={"Keegan Good"}
                  url={"https://github.com/perennialautodidact"}
                />
              </div>
              <div className="col-6 col-md-3 d-flex flex-column align-items-center">
                <GithubDev
                  name={"Monique"}
                  url={"https://github.com/m-oniqu3"}
                />
              </div>
              <div className="col-6 col-md-3 d-flex flex-column align-items-center">
                <GithubDev
                  name={"Jin Choo"}
                  url={"https://github.com/jinchoo"}
                />
              </div>
              <div className="col-6 col-md-3 d-flex flex-column align-items-center">
                <GithubDev
                  name={"waldothedeveloper"}
                  url={"https://github.com/waldothedeveloper"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
