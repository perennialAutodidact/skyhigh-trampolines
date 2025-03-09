import React, { useRef, useLayoutEffect, useState } from "react";
import { useOnLoadImages } from "hooks/useOnLoadImages";
import gsap from "gsap";
import styles from "./DesignSection.module.scss";
import { fadeInFromSide } from "../ScreenshotList/animations";
import { wireframeScreenshots } from "./wireframeScreenshots";

const DesignSection = () => {
  const ref = useRef();
  const tl = useRef();
  const imagesLoaded = useOnLoadImages(ref);

  const [activeCarouselItem, setActiveCarouselItem] = useState(0);

  useLayoutEffect(() => {
    const selector = gsap.utils.selector(ref);

    const designHeader = selector("#design-header");
    const colorsContainer = selector("#colors-container");
    const colorsHeader = selector("#colors-header");
    const colors = selector(".color-swatch");
    const fontsHeader = selector("#fonts-header");
    const fontSampleContainers = selector(".font-sample-container");
    // the wireframe screenshots were lost in transition from Wasabi S3 to Firebase Storage :( 
    // const wireframesHeader = selector("#wireframes-header");
    // const wireframeCarousel = selector("#wireframe-carousel");

    if (imagesLoaded && !tl.current && ref.current) {
      const ctx = gsap.context(() => {
        const duration = 0.75;

        tl.current = gsap.timeline({
          defaults: {
            ease: "power2.out",
          },
          scrollTrigger: {
            trigger: ref.current,
            start: "top center+=200",
            end: "+=500",
          },
        });
        tl.current
          .add(fadeInFromSide(designHeader, { startX: -200, duration }))
          .add(
            fadeInFromSide(colorsHeader, { startX: -200, duration }),
            "-=0.5"
          )
          .add(
            fadeInFromSide(colorsContainer, { startX: -200, duration }),
            "-=0.5"
          )
          .fromTo(
            colors,
            { y: -50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.075 },
            "-=0.5"
          )
          .add(fadeInFromSide(fontsHeader, { startX: -200, duration }), "-=0.5")

          .fromTo(
            fontSampleContainers,
            { x: -200, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration, stagger: 0.075 },
            "-=0.5"
          )
          // .add(
          //   fadeInFromSide(wireframesHeader, { startX: -200, duration }),
          //   "-=0.5"
          // )
          // .add(fadeInFromSide(wireframeCarousel, { startX: 200, duration }));
      }, ref);

      return () => ctx.revert();
    }
  }, [imagesLoaded]);

  return (
    <section id="design-section" className="container-fluid" ref={ref}>
      <div className="row g-3 mb-5">
        <h1 id="design-header" className="display-3 text-center">
          Design
        </h1>
        <div className="col-12 col-md-4 offset-md-4">
          <div id="colors-container" className="container">
            <h2 id="colors-header" className="text-center">
              Colors
            </h2>
            <div className="row pt-4 bg-white rounded border border-1 shadow">
              {colorSections.map((colorSection, index) => (
                <div className="col-3" key={`color-section-${index}`}>
                  {colorSection.map((color) => (
                    <div
                      className="color-swatch mb-4 d-flex flex-column align-items-center"
                      key={color.hex}
                    >
                      <div
                        className={`
                          ${styles.swatch} 
                          bg-${color.name}
                          border border-2 border-dark rounded
                        `}
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
          <h2 id="fonts-header" className="text-center">
            Fonts
          </h2>
          <div className="container">
            <div className="row g-3">
              {fonts.map((font) => (
                <div
                  className="col-12 col-md-6"
                  style={font.style}
                  key={font.name}
                >
                  <div
                    className="
                    font-sample-container
                    bg-white
                    p-4 
                    mb-1 
                    border border-1 rounded shadow
                    text-center 
                  "
                  >
                    <div className="font-sample fs-2">{font.name}</div>
                    <p className="m-0">How quickly daft jumping zebras vex.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* The wireframes screenshots were lost in the transition from Wasabi S3 to Firebase Storage :( */}
      {/* <h2 id="wireframes-header" className="text-center">
        Wireframes
      </h2>
      <div
        id="wireframe-carousel"
        className="container"
        style={{ visibility: "hidden" }}
      >
        <div className="row mb-5">
          <div className="col-12 col-md-8 offset-md-2">
            <div
              id="carouselExampleCaptions"
              className="carousel slide carousel-dark shadow"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-indicators pb-2">
                {wireframeScreenshots.map((_, index) => (
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to={`${index}`}
                    className={activeCarouselItem === index ? "active" : ""}
                    aria-current={
                      activeCarouselItem === index ? "true" : "false"
                    }
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner">
                {wireframeScreenshots.map(({ fileName, caption }, index) => (
                  <div
                    className={`carousel-item ${
                      activeCarouselItem === index ? "active" : ""
                    }`}
                  >
                    <img
                      src={`https://s3.us-west-1.wasabisys.com/skyhigh-trampolines/wireframes/${fileName}`}
                      className="d-block w-100 rounded"
                      alt={`${caption.header} - ${caption.text}`}
                    />
                    <div className="carousel-caption d-none d-md-block bg-light bg-opacity-75 rounded">
                      <h5>{caption.header}</h5>
                      <p>{caption.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div> */}
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
