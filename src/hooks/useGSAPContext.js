import { useMemo } from "react";
import gsap from "gsap";

export const useGSAPContext = (scope) => {
  const ctx = useMemo(() => scope && gsap.context(() => {}, scope), [scope]);
  return ctx;
};
