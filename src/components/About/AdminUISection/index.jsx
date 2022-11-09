import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScreenshotList from "../ScreenshotList";
import { useOnLoadImages } from "../../../hooks/useOnLoadImages";

gsap.registerPlugin(ScrollTrigger);

const AdminUISection = () => {
  const ref = useRef();
  const tl = useRef();
  const screenshotRefs = useRef([])

  const imagesLoaded = useOnLoadImages(ref);

  const addToRefs = (el) => {
    if (el && !screenshotRefs.current.includes(el)) {
      screenshotRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    if (imagesLoaded) {
      let ctx = gsap.context(() => {
        tl.current = gsap.timeline({})

      }, []);
      return () => ctx.revert();
    }
  }, [imagesLoaded]);

  return (
    <section id="admin-ui-section" className="container-fluid">
      <div className="row py-5">
        <div className="col-12 col-md-10 offset-md-1">
          <h1
            id="customer-ui-header"
            className="display-3 ps-md-5"
            // style={{ visibility: "hidden" }}
          >
            Admin UI
          </h1>
        </div>{" "}
        <div className="col-12 col-md-8 mb-5">
          <p
            id="p1"
            className="fs-2 ps-md-5"
            //   style={{ visibility: "hidden" }}
          >
            Admin users can view a{" "}
            <span className="fw-bold text-primary">list of all bookings</span>{" "}
            and <span className="fw-bold text-primary">availability grids</span>{" "}
            for each room.
          </p>
        </div>
        <div className="row">
          <h2 id="admin-bookings-header" className="display-4 text-center">
            Bookings
          </h2>
          <ScreenshotList
            screenshots={adminBookingsScreenshots}
            refAdder={addToRefs}
          />
        </div>
      </div>
    </section>
  );
};

const adminBookingsScreenshots = [
  {
    number: 1,
    headerText: "Bookings List",
    fileName: "adminBookingsList.png",
    alt: "Screenshot of Admin Bookings List View",
  },
  {
    number: 2,
    headerText: "Room Availabilities",
    fileName: "adminRoomAvailabilities.png",
    alt: "Screenshot of Admin Room Availabilities",
  },
];

export default AdminUISection;
