
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const TechStackSection = () => {
  const ref = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const selector = gsap.utils.selector(ref);

    const techStackContainer = selector("#tech-stack-container");
    const techStackHeader = selector("#tech-stack-header");
    const frontendTechStack = selector("#frontend-tech-stack");
    const backendTechStack = selector("#backend-tech-stack");
    const frontendBadges = selector(
      "#frontend-tech-stack > #badges > .tech-badge"
    );
    const backendBadges = selector(
      "#backend-tech-stack > #badges > .tech-badge"
    );

    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 50%",
          end: "+=500",
        },
      });

      tl.current
        .set(techStackContainer, { opacity: 0, y: 500 })
        .set(techStackHeader, { opacity: 0, y: -200 })
        .set(frontendTechStack, { opacity: 0, x: -200 })
        .set(backendTechStack, { opacity: 0, x: 200 })
        .set(frontendBadges, { opacity: 0, y: -50 })
        .set(backendBadges, { opacity: 0, y: -50 });

      tl.current
        .to(techStackContainer, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
        })
        .to(techStackHeader, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
        })
        .to(
          frontendTechStack,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.75,
          },
          "-=0.5"
        )
        .to(
          frontendBadges,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.075,
            duration: 0.5,
          },
          "-=0.25"
        )
        .to(
          backendTechStack,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.75,
          },
          "-=1.5"
        )
        .to(
          backendBadges,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.075,
            duration: 0.5,
          },
          "-=0.3"
        );
      return () => ctx.revert();
    }, ref);
  }, []);

  return (
    <div className="container-fluid" ref={ref}>
      <div
        id="tech-stack-container"
        className="row gy-3 mb-5 p-5 bg-secondary shadow"
        style={{ visibility: "hidden" }}
      >
        <h1
          id="tech-stack-header"
          className="display-3 m-0 text-light text-center"
          style={{ visibility: "hidden" }}
        >
          Tech Stack
        </h1>
        <div
          id="frontend-tech-stack"
          className="col-12 col-md-6 offset-md-3 bg-light rounded p-3 shadow"
          style={{ visibility: "hidden" }}
        >
          <h3 className="text-center mb-3">Frontend</h3>
          <div
            id="badges"
            className="d-flex flex-wrap justify-content-center gap-3"
          >
            {badges.frontend.map(({ src, alt }) => (
              <img src={src} alt={alt} className="tech-badge" key={src} />
            ))}
          </div>
        </div>

        <div
          id="backend-tech-stack"
          className="col-12 col-md-6 offset-md-3 bg-light p-3 rounded shadow"
          style={{ visibility: "hidden" }}
        >
          <h3 className="text-center mb-3">Backend</h3>
          <div
            id="badges"
            className="d-flex flex-wrap justify-content-center gap-3"
          >
            {badges.backend.map(({ src, alt }) => (
              <img src={src} alt={alt} className="tech-badge" key={src} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const badges = {
  frontend: [
    {
      src: "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
      alt: "JavaScript Badge",
    },
    {
      src: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
      alt: "React Badge",
    },
    {
      src: "https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white",
      alt: "Redux Badge",
    },
    {
      src: "https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white",
      alt: "React Router Badge",
    },
    {
      src: "https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white",
      alt: "React Hook Form Badge",
    },
    {
      src: "https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white",
      alt: "Bootstrap Badge",
    },
    {
      src: "https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white",
      alt: "Sass Badge",
    },
    {
      src: "https://img.shields.io/badge/green%20sock-88CE02?style=for-the-badge&logo=greensock&logoColor=white",
      alt: "Greensock Badge",
    },
  ],
  backend: [
    {
      src: "https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase",
      alt: "Firebase Badge",
    },
    {
      src: "https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white",
      alt: "Github Actions Badge",
    },
  ],
};

export default TechStackSection;
