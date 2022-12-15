import gsap from "gsap";
export const fadeInFromSide = (el, options) => {
  const { startX, duration } = options;
  return gsap.fromTo(
    el,
    { autoAlpha: 0, x: startX },
    { autoAlpha: 1, x: 0, duration }
  );
};

export const animateRefList = (
  refList,
  subElementIds,
  animation,
  animationOptions,
  staggerDelay
) => {
  refList.current.forEach((el, index) => {
    let subElements = subElementIds.map((id) => el.querySelector(id));

    let _tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top center+=200`,
      },
    });

    subElements.forEach((el, i) => {
      _tl.add(animation(el, animationOptions[index]), staggerDelay);
    });
  });
};
