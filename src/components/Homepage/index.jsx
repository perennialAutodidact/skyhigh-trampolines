import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelPaymentIntent } from "../../redux/stripeSlice";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.scss";
import { fetchHomepageBgImageUrl } from "redux/authSlice";
import { cancelBooking } from "../../redux/bookingsSlice";
import { useOnLoadImages } from "../../hooks/useOnLoadImages";
import LoadingSpinner from "../LoadingSpinner";
import gsap from "gsap";
import AnimatedMask from "components/About/AnimatedMask";

const Homepage = () => {
  const appDispatch = useDispatch();
  const { paymentIntent } = useSelector((appState) => appState.stripe);
  const { bookingInProgress } = useSelector((appState) => appState.bookings);
  const homePageRef = useRef();
  const tl = useRef();
  const imagesLoaded = useOnLoadImages(homePageRef);
  const homepageBgImageUrl = useSelector(appState => appState.auth.homepageBgImageUrl);


  useEffect(() => {
    if (paymentIntent.id) {
      appDispatch(cancelPaymentIntent(paymentIntent.id));
    }
    if (bookingInProgress) {
      appDispatch(cancelBooking(bookingInProgress.id));
    }
  }, [paymentIntent, bookingInProgress, appDispatch]);

  useLayoutEffect(() => {
    if (!homepageBgImageUrl) {
      appDispatch(fetchHomepageBgImageUrl());
    }

    if (imagesLoaded) {
      let selector = gsap.utils.selector(homePageRef);

      const lightBlueCircle = selector("#light-blue-circle");
      const darkBlueCircle = selector("#dark-blue-circle");
      const grayCircle = selector("#gray-circle");
      const bookingButton = selector("#booking-button");

      let ctx = gsap.context(() => {
        tl.current = gsap.timeline({
          defaults: {
            ease: "elastic.out",
          },
        });

        tl.current
          .set(darkBlueCircle, { y: 500 })
          .set(grayCircle, { y: 500 })
          .set(lightBlueCircle, { y: 500 })
          .set(bookingButton, { y: 100 });

        tl.current
          .to(darkBlueCircle, {
            y: 0,
            autoAlpha: 1,
            duration: 4,
          })
          .to(grayCircle, {
            y: 0,
            autoAlpha: 1,
            duration: 4,
            delay: -4,
          })
          .to(lightBlueCircle, {
            y: 0,
            autoAlpha: 1,
            duration: 4,
            delay: -3.8,
          })
          .to(bookingButton, {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
            delay: -3,
          });
      }, homePageRef);

      return () => ctx.revert();
    }
  }, [homePageRef, imagesLoaded, homepageBgImageUrl, appDispatch]);

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
              <AnimatedMask bgImageUrl={homepageBgImageUrl} />
            </div>
            <div className={`col-12 p-0 position-relative ${styles.content}`}>
              <div
                id="dark-blue-circle"
                className={`${styles.darkBlueCircle}
                bg-secondary rounded-circle
                pe-md-5
                d-flex
                justify-content-center 
                justify-content-md-start
                position-absolute text-light
                `}
              // styles={{ visibility: "hidden" }}
              ></div>
              <div
                id="gray-circle"
                // styles={{ visibility: "hidden" }}
                className={`${styles.lightGrayCircle} bg-white rounded-circle position-absolute`}
              ></div>
              <div
                id="light-blue-circle"
                className={`${styles.lightBlueCircle}
                bg-info p-4 shadow
                rounded-circle 
                d-flex 
                justify-content-center
                position-absolute
                `}
                styles={{ visibility: "hidden" }}
              >
                <Link to="/booking">
                  <button
                    id="booking-button"
                    className="btn btn-primary btn-lg fs-1 p-3 mt-5 px-5 px-3 shadow"
                    style={{ visibility: "hidden" }}
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
