import React, { useLayoutEffect, useRef } from "react";
import { VscGithub } from "react-icons/vsc";
import { BsLinkedin } from "react-icons/bs";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const KGSection = () => {
  const ref = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const selector = gsap.utils.selector(ref);

    const p1 = selector("#p1");
    const headshot = selector("#headshot");
    const kgGithubIcon = selector("#kg-github-icon");
    const kgLinkedinIcon = selector("#kg-linkedin-icon");

    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 50%",
          end: "+=500",
          markers: {
            startColor: "#0000FF",
            endColor: "#0000FF",
          },
        },
      });

      tl.current
        .set(p1, {
          x: -100,
          opacity: 0,
        })
        .set(headshot, {
          opacity: 0,
          x: 200,
          rotate: 15,
        })
        .set(kgGithubIcon, {
          opacity: 0,
          x: -200,
          rotate: -15,
        })
        .set(kgLinkedinIcon, {
          opacity: 0,
          x: 200,
          rotate: -15,
        });

      tl.current
        .to(p1, {
          x: 0,
          duration: 1,
          autoAlpha: 1,
        })
        .to(headshot, {
          x: 0,
          autoAlpha: 1,
          rotate: 0,
          duration: 1,
          delay: -0.5,
        })
        .to(kgGithubIcon, {
          x: 0,
          autoAlpha: 1,
          rotate: 0,
          duration: 0.75,
          ease: "bounce.out",
        })
        .to(kgLinkedinIcon, {
          x: 0,
          autoAlpha: 1,
          rotate: 0,
          duration: 0.75,
          ease: "bounce.out",
          delay: -0.75,
        });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div id="kg-section" className="container-fluid overflow-hidden">
      <div className="row mb-5" ref={ref}>
        <div className="col-12 col-md-8 offset-md-2 text-center">
          <p id="p1" className="fs-2" style={{ visibility: "hidden" }}>
            This is a fork of the original with additional features and polish
            by <span className="text-primary">Keegan Good</span>.
          </p>
        </div>

        <div className="col-12 col-md-6 offset-md-3 mb-5">
          <div className="d-flex flex-column align-items-center gap-3">
            <div
              id="headshot"
              className="rounded-circle shadow border-primary border border-5"
              style={{ visibility: "hidden" }}
            >
              <img
                src="images/circleHeadshot.png"
                alt="Keegan Good Headshot"
                height="200"
                width="200"
              />
            </div>
            <div className="d-flex gap-4 align-items-center">
              <a
                id="kg-github-icon"
                href="https://github.com/perennialAutodidact"
                className="link-secondary d-flex align-items-center display-3 d-flex align-items-center"
                style={{ visibility: "hidden" }}
              >
                <VscGithub />
              </a>
              <a
                id="kg-linkedin-icon"
                href="https://linkedin.com/in/keegangood"
                className="link-secondary display-3 d-flex align-items-center"
                style={{ visibility: "hidden" }}
              >
                <BsLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KGSection;
