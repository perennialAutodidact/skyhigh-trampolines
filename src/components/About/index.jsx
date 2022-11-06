import React from "react";
import { VscGithub } from "react-icons/vsc";
import { BsLinkedin } from "react-icons/bs";
import NumberCircle from "./NumberCircle";
import WizardStep from "./WizardStep";

const AboutPage = () => {
  return (
    <div className="container-fluid py-5">
      <div className="row gy-5">
        <div className="col-12 col-md-8 mb-5 ps-md-5">
          <p className="fs-2">
            This app is a booking and content management system for{" "}
            <span className="fw-bold text-primary">Sky High Trampolines</span>,
            a hypothetical trampoline park.
          </p>
        </div>
        <div className="col-12 col-md-8 offset-md-4 mb-3 mb-md-5 pe-md-5">
          <p className="fs-2 text-end">
            The original project was the result of a collaboration between four
            international developers over a four-week period, the intention
            being to gain experience working remotely as a team.
          </p>
        </div>
      </div>
      <div className="row bg-info mb-5">
        <div className="col-12 col-md-10 offset-md-1 bg-info p-5">
          <div className="container">
            <div className="row gy-5">
              <div className="col-6 col-md-3 d-flex flex-column align-items-center">
                <a
                  href="https://github.com/perennialAutodidact"
                  className="link-secondary d-flex align-items-center display-1"
                >
                  <VscGithub />
                </a>
                <span>Keegan Good</span>
              </div>
              <div className="col-6 col-md-3 d-flex flex-column align-items-center">
                <a
                  href="https://github.com/m-oniqu3"
                  className="link-secondary d-flex align-items-center display-1"
                >
                  <VscGithub />
                </a>
                <span>Monique</span>
              </div>
              <div className="col-6 col-md-3 d-flex flex-column align-items-center">
                <a
                  href="https://github.com/jinchoo"
                  className="link-secondary d-flex align-items-center display-1"
                >
                  <VscGithub />
                </a>
                <span>Jin Choo</span>
              </div>
              <div className="col-6 col-md-3 d-flex flex-column align-items-center">
                <a
                  href="https://github.com/waldothedeveloper"
                  className="link-secondary d-flex align-items-center display-1"
                >
                  <VscGithub />
                </a>
                <span>Waldothedeveloper</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12 col-md-8 offset-md-2 text-center">
          <p className="fs-2">
            This is a fork of the original with additional features and polish
            by <span className="text-primary">Keegan Good</span>.
          </p>
        </div>

        <div className="col-12 col-md-6 offset-md-3 mb-5">
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="rounded-circle shadow border-primary border border-3">
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
                className="link-secondary d-flex align-items-center display-3 d-flex align-items-center"
              >
                <VscGithub />
              </a>
              <a
                href="https://linkedin.com/in/keegangood"
                className="link-secondary display-3 d-flex align-items-center"
              >
                <BsLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

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

      <div className="row">
        <h1 className="display-3 ps-md-5">Customer UI</h1>
        <div className="col-12 col-md-8 mb-5">
          <p className="fs-2 ps-md-5">
            The customer UI consists of a{" "}
            <span className="fw-bold text-primary">home page</span> and a{" "}
            <span className="fw-bold text-primary">six-part wizard form</span>{" "}
            for creating new bookings.
          </p>
        </div>
        <h2 className="display-4 text-center">Wizard Form</h2>
        <div className="container mt-5">
          {wizardSteps.map(({ number, headerText }) => (
            <WizardStep number={number} headerText={headerText} />
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

export default AboutPage;
