import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScreenshotList from "../ScreenshotList";
import { useOnLoadImages } from "../../../hooks/useOnLoadImages";
import { adminScreenshots } from "./adminScreenshots";
import { animateRefList, fadeInFromSide } from "../ScreenshotList/animations";

gsap.registerPlugin(ScrollTrigger);

const AdminUISection = () => {
  const ref = useRef();
  const tl = useRef();
  const bookingScreenshotRefs = useRef([]);
  const productScreenshotRefs = useRef([]);
  const roomScreenshotRefs = useRef([]);
  const addOnScreenshotRefs = useRef([]);

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
    const headerNames = ["bookings", "rooms", "products", "addons"];
    const sectionHeaders = headerNames.map((headerName) =>
      selector(`#admin-${headerName}-header`)
    );

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
          .add(fadeInFromSide(adminUIHeader, { startX: -100, duration: 0.5 }))
          .add(fadeInFromSide(p1, { startX: -100, duration: 0.5 }), "-=0.3");

        let refLists = [
          bookingScreenshotRefs,
          roomScreenshotRefs,
          productScreenshotRefs,
          addOnScreenshotRefs,
        ];

        refLists.forEach((refList, index) => {
          let sectionHeader = sectionHeaders[index];
          let subElementIds = ["#number-circle", "#header", "#screenshot"];
          let duration = 0.75;
          let staggerDelay = `-=${duration * 0.6}`;

          // build an options object  for each sub-element in the ref list
          let animationOptions = refList.current.map((el, i) => ({
            duration,
            startX: i % 2 === 0 ? 200 : -200,
          }));

          // animate section header
          let startX = animationOptions[0].startX;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: sectionHeader,
                start: "top 90%",
              },
            })
            .add(fadeInFromSide(sectionHeader, { startX, duration }));

          // animate the numberCircle, header, and screenshot
          animateRefList(
            refList,
            subElementIds,
            fadeInFromSide,
            animationOptions,
            staggerDelay
          );
        });
      }, ref);
      return () => ctx.revert();
    }
  }, [imagesLoaded]);

  return (
    <section id="admin-ui-section" className="container-fluid" ref={ref}>
      <div className="row bg-disabled py-5">
        <h1
          id="admin-ui-header"
          className="display-3 ps-md-5 m-0"
          style={{ visibility: "hidden" }}
        >
          Admin UI
        </h1>
        <div className="col-12 col-md-10 offset-md-1"></div>{" "}
        <div className="col-12 col-md-8 p-0">
          <p
            id="p1"
            className="fs-2 p-0 ps-3 ps-md-5"
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
        <div className="col-12 col-md-8 offset-md-2 mt-3">
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
          <h2
            id="admin-rooms-header"
            className="display-4"
            style={{ visibility: "hidden" }}
          >
            Rooms
          </h2>
        </div>
        <ScreenshotList
          screenshots={adminScreenshots.rooms}
          refAdder={refAdder}
          refList={roomScreenshotRefs}
        />
      </div>

      <div className="row mt-5">
        <div className="col-12 col-md-8 offset-md-2">
          <h2
            id="admin-products-header"
            className="display-4"
            style={{ visibility: "hidden" }}
          >
            Products
          </h2>
        </div>
        <ScreenshotList
          screenshots={adminScreenshots.products}
          refAdder={refAdder}
          refList={productScreenshotRefs}
        />
      </div>

      <div className="row mt-5">
        <div className="col-12 col-md-8 offset-md-2">
          <h2
            id="admin-addons-header"
            className="display-4"
            style={{ visibility: "hidden" }}
          >
            Add-Ons
          </h2>
        </div>
        <ScreenshotList
          screenshots={adminScreenshots.addOns}
          refAdder={refAdder}
          refList={addOnScreenshotRefs}
        />
      </div>
    </section>
  );
};
export default AdminUISection;
