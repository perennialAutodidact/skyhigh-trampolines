import React from "react";
import NumberCircle from "../NumberCircle";

const ScreenshotItem = ({ number, headerText, fileName, alt }) => {
  return (
    <div
      className={`
          mb-5
          col-12 col-md-6 
          offset-md-${number % 2 === 0 ? 4 : 2} 
          d-flex flex-column gap-3
          justify-content-end
          ${number % 2 === 0 ? "align-items-end" : ""}
        `}
    >
      <div className="d-flex gap-2 align-items-end">
        <div className={`order-${number % 2 === 0 ? 2 : 1}`}>
          <NumberCircle number={number} />
        </div>
        <h3
          id="header"
          className={`m-0 order-${number % 2 === 0 ? 1 : 2}`}
          style={{ visibility: "hidden" }}
        >
          {headerText}
        </h3>
      </div>
      <img
        id={`screenshot`}
        src={`https://s3.us-west-1.wasabisys.com/skyhigh-trampolines/${fileName}`}
        alt={alt}
        width="100%"
        style={{ visibility: "hidden" }}
        className="shadow"
      />
    </div>
  );
};

export default ScreenshotItem;
