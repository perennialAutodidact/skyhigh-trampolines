import React from "react";
import ScreenshotItem from "./ScreenshotItem";

const ScreenshotList = ({ screenshots, refAdder }) => {
  return (
    <div className="container mt-5">
      {screenshots.map(({ number, headerText, fileName, alt }) => (
        <div className="row" ref={refAdder} key={number}>
          <ScreenshotItem
            number={number}
            headerText={headerText}
            fileName={fileName}
            alt={alt}
            key={number}
          />
        </div>
      ))}
    </div>
  );
};

export default ScreenshotList;
