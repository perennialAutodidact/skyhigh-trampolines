import React from "react";

const TechStackSection = () => {
  return (
    <div className="container-fluid">
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
          <div
            id="badges"
            className="d-flex flex-wrap justify-content-center gap-3"
          >
            {badges.frontend.map(({ src, alt }) => (
              <img src={src} alt={alt} className="tech-badge" key={alt} />
            ))}
          </div>
        </div>

        <div
          id="backend-tech-stack"
          className="col-12 col-md-6 offset-md-3 bg-light p-3 rounded shadow"
        >
          <h3 className="text-center mb-3">Backend</h3>
          <div
            id="badges"
            className="d-flex flex-wrap justify-content-center gap-3"
          >
            {badges.backend.map(({ src, alt }) => (
              <img src={src} alt={alt} className="tech-badge" key={alt} />
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
