
import React from "react";
import { VscGithub } from "react-icons/vsc";

const GithubDev = ({ name, url }) => {
  return (
    <div className="gh-dev d-flex flex-column align-items-center">
      <a
        href={url}
        className="link-secondary d-flex align-items-center display-1"
      >
        <VscGithub />
      </a>
      <span>{name}</span>
    </div>
  );
};

export default GithubDev;
