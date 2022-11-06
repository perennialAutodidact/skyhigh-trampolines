import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelPaymentIntent } from "../../redux/stripeSlice";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.scss";
import { cancelBooking } from "../../redux/bookingsSlice";
import { useOnLoadImages } from "../../hooks/useOnLoadImages";
import LoadingSpinner from "../LoadingSpinner";
import gsap from "gsap";
import AnimatedMask from "components/About/AnimatedMask";

const Homepage = () => {
  const appDispatch = useDispatch();
  const { paymentIntent } = useSelector((appState) => appState.stripe);
  const { bookingInProgress } = useSelector((appState) => appState.bookings);
  const homePageRef = useRef(null);
  const imagesLoaded = useOnLoadImages(homePageRef);

  useEffect(() => {
    if (paymentIntent.id) {
      appDispatch(cancelPaymentIntent(paymentIntent.id));
    }
    if (bookingInProgress) {
      appDispatch(cancelBooking(bookingInProgress.id));
    }
  }, [paymentIntent, bookingInProgress, appDispatch]);

  let q = gsap.utils.selector(homePageRef);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const lightBlueCircle = q("#light-blue-circle");
      const darkBlueCircle = q("#dark-blue-circle");
      const grayCircle = q("#gray-circle");
      const bookingButton = q("#booking-button");

      tl.set(bookingButton, { opacity: 0, y: 100 })
        .set(darkBlueCircle, { autoAlpha: 1 })
        .set(grayCircle, { autoAlpha: 1 })
        .set(lightBlueCircle, { autoAlpha: 1 })
        .from(darkBlueCircle, {
          y: 500,
          duration: 4,
          ease: "elastic.out",
        })
        .from(grayCircle, {
          y: 500,
          duration: 4,
          ease: "elastic.out",
          delay: -4,
        })
        .from(lightBlueCircle, {
          y: 500,
          duration: 4,
          ease: "elastic.out",
          delay: -3.8,
        })
        .to(bookingButton, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
          delay: -3,
        });
    }, homePageRef.current);

    return () => {
      ctx.revert();
    };
  }, [q]);

  return (
    <div ref={homePageRef}>
      {!imagesLoaded ? (
        <div className="mt-5 d-flex justify-content-center align-items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <section
          className={`container-fluid position-relative ${styles.homepage}`}
        >
          <div className="row">
            <div className="col-12 px-0">
              <h1 className="my-3 text-center">Sky High Trampoline Park</h1>
              <AnimatedMask />
            </div>
            <div className={`col-12 p-0 position-relative ${styles.content}`}>
              <div
                className={`${styles.darkBlueCircle}
                  bg-secondary rounded-circle
                  pe-md-5
                  d-flex
                  justify-content-center 
                  justify-content-md-start
                  position-absolute text-light
                `}
                id="dark-blue-circle"
              ></div>
              <div
                className={`${styles.lightGrayCircle} bg-white rounded-circle position-absolute`}
                id="gray-circle"
              ></div>
              <div
                className={`${styles.lightBlueCircle}
                  bg-info p-4 shadow
                  rounded-circle 
                  d-flex 
                  justify-content-center
                  position-absolute
                `}
                id="light-blue-circle"
              >
                <Link to="/booking">
                  <button
                    id="booking-button"
                    className="btn btn-primary btn-lg fs-1 p-3 mt-5 px-5 px-3 shadow"
                  >
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Homepage;
