import React, { useLayoutEffect, useRef } from "react";
import { useGSAPContext } from "hooks/useGSAPContext";
import gsap from "gsap";

const TechStackSection = () => {
  const ref = useRef();
  const ctx = useGSAPContext(ref);
  const q = gsap.utils.selector(ref);

  useLayoutEffect(() => {
    if (ctx) {
      const techStackContainer = q("#tech-stack-container");
      const techStackHeader = q("#tech-stack-header");
      const frontendTechStack = q("#frontend-tech-stack");
      const backendTechStack = q("#backend-tech-stack");
      const frontendBadges = q("#frontend-tech-stack > #badges > .tech-badge")
      const backendBadges = q("#backend-tech-stack > #badges > .tech-badge");

      ctx.add(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 50%",
            end: "top -100%",
          },
        });

        tl.add(gsap.set(techStackContainer, {opacity: 0, y: 500}))
        tl.add(gsap.set(techStackHeader, { opacity: 0, y: -200 }));
        tl.add(gsap.set(frontendTechStack, { opacity: 0, x: -200 }));
        tl.add(gsap.set(backendTechStack, { opacity: 0, x: 200 }));
        tl.add(gsap.set(frontendBadges, {opacity: 0, y: -50}))
        tl.add(gsap.set(backendBadges, {opacity: 0, y: -50}))

        tl.add(
          gsap.to(
            techStackContainer,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 1,
            }
          )
        );

        tl.add(
          gsap.to(techStackHeader, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.75,
          })
        );
        
        tl.add(gsap.to(frontendTechStack, {
          opacity:1,
          x:0,
          ease: "power2.out",
          duration: 0.75,
          delay: -0.5
        }))

        tl.add(gsap.to(frontendBadges, {
          opacity: 1,
          y: 0,
          stagger: 0.075,
          ease: "power2.out",
          duration: 0.5,
          delay: -0.25
        }))

        tl.add(gsap.to(backendTechStack, {
          opacity: 1,
          x:0,
          ease: "power2.out",
          duration: 0.75,
          delay: -1.5
        }))

        tl.add(gsap.to(backendBadges, {
          opacity: 1,
          y:0,
          stagger: 0.075,
          ease: "power2.out",
          duration: 0.5,
          delay: -0.3
        }))
      });
    }
  }, [ctx, q]);

  return (
    <div className="container-fluid" ref={ref}>
      <div
        id="tech-stack-container"
        className="row gy-3 my-5 p-5 bg-secondary shadow"
      >
        <h1
          id="tech-stack-header"
          className="display-3 m-0 text-light text-center"
        >
          Tech Stack
        </h1>
        <div
          id="frontend-tech-stack"
          className="col-12 col-md-6 offset-md-3 bg-light rounded p-3 shadow"
        >
          <h3 className="text-center mb-3">Frontend</h3>
          <div id="badges" className="d-flex flex-wrap justify-content-center gap-3">
            <img
              src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
              alt="JavaScript badge"
              className="tech-badge"
            />
            <img
              src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
              alt="React badge"
              className="tech-badge"
            />
            <img
              src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"
              alt="Redux badge"
              className="tech-badge"
            />
            <img
              src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"
              alt="React Router badge"
              className="tech-badge"
            />
            <img
              src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white"
              alt="React Hook Form badge"
              className="tech-badge"
            />
            <img
              src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white"
              alt="Bootstrap badge"
              className="tech-badge"
            />
            <img
              src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white"
              alt="Sass badge"
              className="tech-badge"
            />
            <img
              src="https://img.shields.io/badge/green%20sock-88CE02?style=for-the-badge&logo=greensock&logoColor=white"
              alt="Greensock badge"
              className="tech-badge"
            />
          </div>
        </div>

        <div
          id="backend-tech-stack"
          className="col-12 col-md-6 offset-md-3 bg-light p-3 rounded shadow"
        >
          <h3 className="text-center mb-3">Backend</h3>
          <div id="badges" className="d-flex flex-wrap justify-content-center gap-3">
            <img
              src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase"
              alt="Firebase badge"
              className="tech-badge"
            />
            <img
              src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white"
              alt="Github Actions badge"
              className="tech-badge"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackSection;
