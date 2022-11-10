import React, { useMemo } from "react";
import NumberCircle from "../NumberCircle";
import { useBreakpoint } from "hooks/useBreakpoint";

const ScreenshotItem = ({ index, headerText, fileName, alt }) => {
  const breakpoint = useBreakpoint();

  const screenshot = useMemo(
    () => (breakpoint === "sm" ? fileName.mobile : fileName.desktop),
    [breakpoint, fileName]
  );

  return (
    <div
      className={`
          mb-5
          col-12 col-md-6 
          offset-md-${index % 2 === 1 ? 4 : 2} 
          d-flex flex-column gap-3
          justify-content-end
          ${index % 2 === 1 ? "align-items-end" : ""}
        `}
    >
      <div className="d-flex gap-2 align-items-end">
        <div className={`order-${index % 2 === 1 ? 2 : 1}`}>
          <NumberCircle number={`${index + 1}`} />
        </div>
        <h3
          id="header"
          className={`m-0 order-${index % 2 === 1 ? 1 : 2}`}
          style={{ visibility: "hidden" }}
        >
          {headerText}
        </h3>
      </div>
      <img
        id={`screenshot`}
        src={`https://s3.us-west-1.wasabisys.com/skyhigh-trampolines/${screenshot}`}
        alt={alt}
        width="100%"
        style={{ visibility: "hidden" }}
        className="shadow"
      />
    </div>
  );
};

export default ScreenshotItem;
