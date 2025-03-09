import React, {
  useRef,
  useLayoutEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import { gsap } from "gsap";
import styles from "./AnimatedMask.module.scss";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useBreakpoint } from "hooks/useBreakpoint";

const AnimatedMask = ({ bgImageUrl }) => {
  const windowSize = useWindowSize();
  const breakpoint = useBreakpoint();
  const maskRef = useRef();
  const maskBgRef = useRef();
  const [maskImageIndex, setMaskImageIndex] = useState(0);

  const onRepeat = useCallback(() => {
    setMaskImageIndex((maskImageIndex) => (maskImageIndex + 1) % 3);
  }, []);

  console.log('animated mask component', { bgImageUrl })
  const shrinkFactor = useMemo(() => {
    return {
      sm: 1.5,
      md: 3,
      lg: 4,
    }[breakpoint];
  }, [breakpoint]);

  const tl = useRef();
  useLayoutEffect(() => {
    // if (maskBgRef.current){
    //   maskBgRef.style.backgroundImage = 'url(images/sky1.png)';
    // }

    const mask = maskRef.current;
    const maskImageSize = windowSize.width / shrinkFactor;

    mask.style.maskSize = `${maskImageSize}px ${maskImageSize}px`;
    mask.style.WebkitMaskSize = `${maskImageSize}px ${maskImageSize}px`;

    mask.style.maskImage = `url("images/kid${maskImageIndex}.png")`;
    mask.style.WebkitMaskImage = `url("images/kid${maskImageIndex}.png")`;

    let initialDelay = 2;
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        repeat: -1,
        onComplete: function () {
          initialDelay = 0;
        },
        onRepeat,
      });

      const bgHeight = gsap.getProperty(mask, "height");
      const bgWidth = gsap.getProperty(mask, "width");
      let xPos =
        breakpoint === "sm"
          ? bgWidth / 2 - maskImageSize / 2
          : Math.random() * (windowSize.width - maskImageSize);

      tl.current
        .set(mask, {
          maskPosition: `${xPos}px ${bgHeight}px`,
          WebkitMaskImage: `${xPos}px ${bgHeight}px`,
        })
        .to(mask, {
          maskPosition: `${xPos}px 0`,
          WebkitMaskPosition: `${xPos}px 0`,
          ease: "sine.out",
          delay: initialDelay,
          duration: 1.5,
        })
        .to(mask, {
          maskPosition: `${xPos}px ${bgHeight}px`,
          WebkitMaskPosition: `${xPos}px ${bgHeight}px`,
          ease: "sine.in",
          duration: 1.5,
        });
    }, maskRef.current);
    return () => tl.current && tl.current.progress(0).kill() && ctx.revert();
  }, [maskRef, windowSize, onRepeat, maskImageIndex, breakpoint, shrinkFactor]);

  return (
    <div className={`${styles.mask}`} ref={maskRef}>
      <img src={bgImageUrl} className={styles.img} alt="" ref={maskBgRef} />
    </div>
  );
};

export default AnimatedMask;