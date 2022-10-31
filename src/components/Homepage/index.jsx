import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelPaymentIntent } from "../../redux/stripeSlice";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.scss";
import { cancelBooking } from "../../redux/bookingsSlice";
import { useOnLoadImages } from "../../hooks/useOnLoadImages";
import { useBreakpoint } from "hooks/useBreakpoint";
import LoadingSpinner from "../LoadingSpinner";
import AnimatedMask from "components/About/AnimatedMask";
import { gsap } from "gsap";
import { BsClouds } from "react-icons/bs";

const Homepage = () => {
  const appDispatch = useDispatch();
  const { paymentIntent } = useSelector((appState) => appState.stripe);
  const { bookingInProgress } = useSelector((appState) => appState.bookings);
  const homePageRef = useRef(null);
  const q = gsap.utils.selector(homePageRef);
  const imagesLoaded = useOnLoadImages(homePageRef);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (paymentIntent.id) {
      appDispatch(cancelPaymentIntent(paymentIntent.id));
    }
    if (bookingInProgress) {
      appDispatch(cancelBooking(bookingInProgress.id));
    }
  }, [paymentIntent, bookingInProgress, appDispatch]);

  useEffect(() => {}, []);

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
                id="large-circle"
              ></div>
              <div
                className={`${styles.lightGrayCircle} bg-light rounded-circle position-absolute`}
                id="small-circle"
              ></div>
              <div
                className={`${styles.lightBlueCircle}
                  bg-info p-4
                  border border-5 border-white
                  rounded-circle 
                  d-flex 
                  justify-content-center
                  position-absolute
                `}
                id="medium-circle"
              >
                <Link to="/booking">
                  <button className="btn btn-primary btn-lg fs-1 p-3 mt-5 px-5 px-3 shadow">
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
