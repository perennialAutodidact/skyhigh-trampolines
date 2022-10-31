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

const AnimatedMask = () => {
  const windowSize = useWindowSize();
  const breakpoint = useBreakpoint();
  const maskRef = useRef(null);
  const [maskImageIndex, setMaskImageIndex] = useState(0);

  const onRepeat = useCallback(() => {
    setMaskImageIndex((maskImageIndex) => (maskImageIndex + 1) % 3);
  }, []);

  const shrinkFactor = useMemo(() => {
    return {
      sm: 1.5,
      md: 3,
      lg: 4,
    }[breakpoint];
  }, [breakpoint]);

  const tl = useRef();
  useLayoutEffect(() => {
    if (maskRef.current) {
      const mask = maskRef.current;
      const maskImageSize = windowSize.width / shrinkFactor;
      console.log(windowSize);
      mask.style.maskSize = `${maskImageSize}px ${maskImageSize}px`;
      mask.style.WebkitMaskSize = `${maskImageSize}px ${maskImageSize}px`;
      mask.style.maskImage = `url("images/kid${maskImageIndex}.png")`;
      mask.style.WebkitMaskImage = `url("images/kid${maskImageIndex}.png")`;

      const ctx = gsap.context(() => {
        tl.current = gsap.timeline({
          repeat: -1,
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
            duration: 2,
          })
          .to(mask, {
            maskPosition: `${xPos}px ${bgHeight}px`,
            WebkitMaskPosition: `${xPos}px ${bgHeight}px`,
            ease: "sine.in",
            duration: 2,
          });
      }, maskRef.current);
    }
    return () => tl.current && tl.current.progress(0).kill();
  }, [maskRef, windowSize, onRepeat, maskImageIndex, breakpoint, shrinkFactor]);

  return (
    <div className={`${styles.mask}`} ref={maskRef}>
      <img src={`images/sky${1}.jpg`} alt="" className={styles.img} />
    </div>
  );
};

export default AnimatedMask;
