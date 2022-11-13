import React, { useRef, useLayoutEffect } from "react";
import { useOnLoadImages } from "hooks/useOnLoadImages";
import gsap from "gsap";
import styles from "./DesignSection.module.scss";

const DesignSection = () => {
  const ref = useRef();
  const imagesLoaded = useOnLoadImages(ref);

  useLayoutEffect(() => {
    if (imagesLoaded) {
      const ctx = gsap.context(() => {}, ref);

      return () => ctx.revert();
    }
  }, [imagesLoaded]);

  return (
    <section id="design-section" className="container-fluid" ref={ref}>
      <div className="row g-3 mb-5">
        <h1 className="display-3 text-center">Design</h1>
        <div className="col-12 col-md-4 offset-md-4">
          <div className="container">
            <h2 className="text-center">Colors</h2>
            <div className="row pt-4 bg-white rounded border border-1 shadow">
              {colorSections.map((colorSection, index) => (
                <div className="col-3" key={`color-section-${index}`}>
                  {colorSection.map((color) => (
                    <div
                      className="mb-4 d-flex flex-column align-items-center"
                      key={color.hex}
                    >
                      <div
                        className={`${styles.swatch} bg-${color.name} border border-2 border-dark rounded`}
                      ></div>
                      <span>{color.hex}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12 col-md-8 offset-md-2">
          <h2 className="text-center">Fonts</h2>
          <div className="container">
            <div className="row g-3">
              {fonts.map((font) => (
                <div
                  className="col-12 col-md-6"
                  style={font.style}
                  key={font.name}
                >
                  <div className="bg-white p-4 border border-1 rounded text-center mb-1 shadow">
                    <div className="fs-2">{font.name}</div>
                    <p className="m-0">How quickly daft jumping zebras vex.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const colorSections = [
  [
    { name: "primary", hex: "#ff512a" },
    { name: "light", hex: "#f2f2f2" },
  ],
  [
    { name: "secondary", hex: "#003049" },
    { name: "green", hex: "#66c653" },
  ],
  [
    { name: "info", hex: "#2ad8ff" },
    { name: "yellow", hex: "#f5f500" },
  ],
  [
    { name: "danger", hex: "#dc3545" },
    { name: "red", hex: "#ff7676" },
  ],
];

const fonts = [
  {
    name: "Didact Gothic",
    style: { fontFamily: '"Didact Gothic", sans-serif' },
  },
  { name: "Roboto", style: { fontFamily: '"Roboto", sans-serif' } },
];

export default DesignSection;
