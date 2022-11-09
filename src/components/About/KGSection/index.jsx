import React from "react";
import { VscGithub } from "react-icons/vsc";
import { BsLinkedin } from "react-icons/bs";

const KGSection = () => {
  return (
    <div id="kg-section" className="container-fluid overflow-hidden">
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
                id="kg-github-icon"
                href="https://github.com/perennialAutodidact"
                className="link-secondary d-flex align-items-center display-3 d-flex align-items-center"
              >
                <VscGithub />
              </a>
              <a
                id="kg-linkedin-icon"
                href="https://linkedin.com/in/keegangood"
                className="link-secondary display-3 d-flex align-items-center"
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
