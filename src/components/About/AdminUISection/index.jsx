import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScreenshotList from "../ScreenshotList";
import { useOnLoadImages } from "../../../hooks/useOnLoadImages";
import { adminScreenshots } from "./adminScreenshots";

gsap.registerPlugin(ScrollTrigger);

const AdminUISection = () => {
  const ref = useRef();
  const tl = useRef();
  const bookingScreenshotRefs = useRef([]);

  const imagesLoaded = useOnLoadImages(ref);

  const refAdder = (el, refList) => {
    if (el && !refList.current.includes(el)) {
      refList.current.push(el);
    }
  };

  useLayoutEffect(() => {
    const selector = gsap.utils.selector(ref);
    const adminUIHeader = selector("#admin-ui-header");
    const p1 = selector("#p1");
    const bookingsHeader = selector("#admin-bookings-header");

    if (imagesLoaded) {
      let ctx = gsap.context(() => {
        tl.current = gsap.timeline({
          defaults: {
            ease: "power2.out",
          },
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
        });

        tl.current
          .set(adminUIHeader, { x: -200 })
          .set(p1, { x: -200 })
          .set(bookingsHeader, { y: -200 });

        tl.current
          .to(adminUIHeader, {
            autoAlpha: 1,
            x: 0,
            duration: 1,
          })
          .to(
            p1,
            {
              autoAlpha: 1,
              x: 0,
              duration: 1,
            },
            "-=0.5"
          );

        bookingScreenshotRefs.current.forEach((el, index) => {
          let numberCircle = el.querySelector(`#number-circle`);
          let header = el.querySelector(`#header`);
          let stepImg = el.querySelector(`#screenshot`);

          let startX = (index + 1) % 2 === 1 ? 200 : -200;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: el,
                start: `top 80%`,
              },
            })
            .to(bookingsHeader, { autoAlpha: 1, y: 0 })
            .fromTo(
              numberCircle,
              { autoAlpha: 0, x: startX },
              { x: 0, autoAlpha: 1, duration: 1 }
            )
            .fromTo(
              header,
              {
                x: startX,
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.75,
              },
              "-=0.75"
            )
            .to(
              stepImg,
              {
                autoAlpha: 1,
                duration: 1,
              },
              "-=0.75"
            );
        });
      }, []);
      return () => ctx.revert();
    }
  }, [imagesLoaded]);

  return (
    <section id="admin-ui-section" className="container-fluid" ref={ref}>
      <div className="row py-5">
        <h1
          id="admin-ui-header"
          className="display-3 ps-md-5"
          style={{ visibility: "hidden" }}
        >
          Admin UI
        </h1>
        <div className="col-12 col-md-10 offset-md-1"></div>{" "}
        <div className="col-12 col-md-8 mb-5 p-0">
          <p
            id="p1"
            className="fs-2 p-0 ps-md-5"
            style={{ visibility: "hidden" }}
          >
            Admin users can view a{" "}
            <span className="fw-bold text-primary">list of all bookings</span>{" "}
            and <span className="fw-bold text-primary">availability grids</span>{" "}
            for each room.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <h2
            id="admin-bookings-header"
            className="display-4"
            style={{ visibility: "hidden" }}
          >
            Bookings
          </h2>
        </div>
        <ScreenshotList
          screenshots={adminScreenshots.bookings}
          refAdder={refAdder}
          refList={bookingScreenshotRefs}
        />
      </div>

      <div className="row mt-5">
        <div className="col-12 col-md-8 offset-md-2">
          <h2 id="admin-products-header" className="display-4">
            Products
          </h2>
        </div>
        {/* <ScreenshotList screenshots={adminProductsScreenshots} refAdder={refAdder}/> */}
      </div>
    </section>
  );
};
export default AdminUISection;
