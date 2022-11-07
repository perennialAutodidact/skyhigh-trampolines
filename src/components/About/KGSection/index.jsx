import React, { useLayoutEffect, useRef } from "react";
import { VscGithub } from "react-icons/vsc";
import { BsLinkedin } from "react-icons/bs";
import { useGSAPContext } from "hooks/useGSAPContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const KGSection = () => {
  const ref = useRef();
  const ctx = useGSAPContext(ref);
  const q = gsap.utils.selector(ref);

  useLayoutEffect(() => {
    const container = ref.current;
    const p1 = q("#p1");
    const headshot = q("#headshot");
    const kgGithubIcon = q(".kg-github-icon");
    const kgLinkedinIcon = q(".kg-linkedin-icon");
    if (ctx) {
      ctx.add(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 50%",
            end: "top -100%",
          },
        });
        tl.add(
          gsap.set(headshot, {
            visibility: "hidden",
            opacity: 0,
            rotate: 15,
            x: 200,
          })
        );
        tl.add(
          gsap.set(kgGithubIcon, {
            opacity: 0,
            x: -200,
            rotate: -15,
          })
        );
        tl.add(
          gsap.set(kgLinkedinIcon, {
            opacity: 0,
            x: 200,
            rotate: -15,
          })
        );
        tl.add(
          gsap.fromTo(
            p1,
            {
              x: -100,
              opacity: 0,
            },
            {
              duration: 1,
              x: 0,
              opacity: 1,
              ease: "power2.out",
            }
          )
        );
        tl.add(
          gsap.to(headshot, {
            x: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
            delay: -0.5,
          })
        );
        tl.add(
          gsap.to(kgGithubIcon, {
            opacity: 1,
            rotate: 0,
            duration: 1,
          })
        );
        tl.add(
          gsap.to(kgGithubIcon, {
            x: 0,
            duration: 1.5,
            ease: "bounce.out",
            delay: -1,
          })
        );
        tl.add(
          gsap.to(kgLinkedinIcon, {
            opacity: 1,
            rotate: 0,
            duration: 1,
            delay: -1.5,
          })
        );
        tl.add(
          gsap.to(kgLinkedinIcon, {
            x: 0,
            duration: 1.5,
            ease: "bounce.out",
            delay: -1.5,
          })
        );
      });
      return () => ctx.revert()
    }
  }, [ctx, q]);

  return (
    <div className="container-fluid vh-75 overflow-hidden" ref={ref}>
      <div className="row mb-5">
        <div className="col-12 col-md-8 offset-md-2 text-center">
          <p id="p1" className="fs-2">
            This is a fork of the original with additional features and polish
            by <span className="text-primary">Keegan Good</span>.
          </p>
        </div>

        <div className="col-12 col-md-6 offset-md-3 mb-5">
          <div className="d-flex flex-column align-items-center gap-3">
            <div
              id="headshot"
              className="rounded-circle shadow border-primary border border-5"
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
                href="https://github.com/perennialAutodidact"
                className="kg-github-icon link-secondary d-flex align-items-center display-3 d-flex align-items-center"
              >
                <VscGithub />
              </a>
              <a
                href="https://linkedin.com/in/keegangood"
                className="kg-linkedin-icon link-secondary display-3 d-flex align-items-center"
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
