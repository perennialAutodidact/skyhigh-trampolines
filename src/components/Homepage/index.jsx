import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelPaymentIntent } from "../../redux/stripeSlice";
import { Link } from "react-router-dom";
import styled from "./Homepage.module.scss";
import { cancelBooking } from "../../redux/bookingsSlice";

const Homepage = () => {
  const appDispatch = useDispatch();
  const { paymentIntent } = useSelector((appState) => appState.stripe);
  const { bookingInProgress } = useSelector((appState) => appState.bookings);
  useEffect(() => {
    if (paymentIntent.id) {
      appDispatch(cancelPaymentIntent(paymentIntent.id));
    }
    if (bookingInProgress) {
      appDispatch(cancelBooking(bookingInProgress.id));
    }
  }, [paymentIntent, bookingInProgress, appDispatch]);

  return (
    <section className={`${styled.homepage} position-relative`}>
      <figure className="h-100 w-100 position-relative">
        <img
          className="img-fluid h-100 w-100"
          src="https://images.unsplash.com/photo-1612985838143-47ffc9b76532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80"
          alt="Women jumping in trampoline"
        />
      </figure>

      <div
        className={`${styled.overlay} position-absolute d-flex justify-content-center align-items-center w-100 bg-overlay bg-opacity-50`}
      >
        <button type="button" className="btn btn-light btn-lg rounded shadow">
          <Link
            to="/booking"
            className="text-decoration-none link-dark fs-5 fw-bold"
          >
            Buy Tickets
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Homepage;
