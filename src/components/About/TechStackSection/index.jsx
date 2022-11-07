import React, { useLayoutEffect, useRef } from "react";
import { useGSAPContext } from "hooks/useGSAPContext";
import gsap from "gsap";

const TechStackSection = () => {
  const ref = useRef();
  const ctx = useGSAPContext(ref);
  const q = gsap.utils.selector(ref);

  return (
    <div className="container-fluid" ref={ref}>
      <div className="row gy-3 my-5 p-5 bg-secondary shadow">
        <h1 className="display-3 m-0 text-light text-center">Tech Stack</h1>
        <div className="col-12 col-md-6 offset-md-3 bg-light rounded p-3 shadow">
          <h3 className="text-center mb-3">Frontend</h3>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <img
              src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
              alt="JavaScript badge"
            />
            <img
              src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
              alt="React badge"
            />
            <img
              src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"
              alt="Redux badge"
            />
            <img
              src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"
              alt="React Router badge"
            />
            <img
              src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white"
              alt="React Hook Form badge"
            />
            <img
              src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white"
              alt="Bootstrap badge"
            />
            <img
              src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white"
              alt="Sass badge"
            />
            <img
              src="https://img.shields.io/badge/green%20sock-88CE02?style=for-the-badge&logo=greensock&logoColor=white"
              alt="Greensock badge"
            />
          </div>
        </div>

        <div className="col-12 col-md-6 offset-md-3 bg-light p-3 rounded shadow">
          <h3 className="text-center mb-3">Backend</h3>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <img
              src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase"
              alt="Firebase badge"
            />
            <img
              src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white"
              alt="Github Actions badge"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackSection;
