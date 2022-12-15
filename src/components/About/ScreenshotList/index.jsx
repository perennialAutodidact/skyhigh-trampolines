import React from "react";
import ScreenshotItem from "./ScreenshotItem";

const ScreenshotList = ({ screenshots, refAdder, refList }) => {
  return (
    <div className="container-fluid mt-5">
      {screenshots.map(({ headerText, fileName, alt }, index) => (
        <div className="row" ref={el=>refAdder(el, refList)} key={index}>
          <ScreenshotItem
            index={index}
            headerText={headerText}
            fileName={fileName}
            alt={alt}
          />
        </div>
      ))}
    </div>
  );
};

export default ScreenshotList;