import gsap from "gsap";
export const fadeInFromSide = (el, startX, duration) => {
  return gsap.fromTo(
    el,
    { autoAlpha: 0, x: startX },
    { autoAlpha: 1, x: 0, duration }
  );
};
