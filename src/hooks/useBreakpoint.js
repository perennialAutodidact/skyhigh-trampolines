import { useEffect, useState } from "react";
import _ from "lodash";

const getDeviceConfig = (width) => {
  if (width < 320) {
    return "xs";
  } else if (width >= 320 && width < 768) {
    return "sm";
  } else if (width >= 768 && width < 1024) {
    return "md";
  } else if (width >= 1024) {
    return "lg";
  }
};
export const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState(() =>
    getDeviceConfig(window.innerWidth)
  );

  useEffect(() => {
    const calcInnerWidth = _.throttle(function () {
      setBrkPnt(getDeviceConfig(window.innerWidth));
    }, 200);
    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, []);

  return brkPnt;
};
