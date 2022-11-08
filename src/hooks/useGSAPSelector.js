import { useMemo } from "react";
import gsap from "gsap";

export const useGSAPSelector = (scope) => {
  const selector = useMemo(() => gsap.utils.selector(scope), [scope]);
  return selector;
};
