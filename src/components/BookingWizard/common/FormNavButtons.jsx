import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cancelPaymentIntent } from "../../../redux/stripeSlice";
import { cancelBooking } from "../../../redux/bookingsSlice";

const FormNavButtons = ({ submitButtonText, goBack }) => {
  const appDispatch = useDispatch();
  const { paymentIntent } = useSelector((appState) => appState.stripe);
  const { bookingInProgress } = useSelector((appState) => appState.bookings);

  const cancelBookingInProgress = useCallback(
    (paymentIntent, bookingInProgress) => {
      console.log({ paymentIntent, bookingInProgress });
      if (paymentIntent.id) {
        appDispatch(cancelPaymentIntent(paymentIntent.id));
      }
      if (bookingInProgress.id) {
        appDispatch(cancelBooking(bookingInProgress.id));
      }
    },
    [appDispatch]
  );
  return (
    <div className="row my-3 g-2 px-2 d-flex align-items-end">
      <div className="col-12 col-lg-6 order-2 order-lg-1">
        <button onClick={goBack} className="btn btn-outline-dark w-100">
          Back
        </button>
      </div>
      <div className="col-12 col-lg-6 order-1 order-lg-2">
        <button type="submit" className="btn btn-success w-100">
          {submitButtonText}
        </button>
      </div>
      <div className="col-10 order-3">
        <Link
          className="link-dark text-decoration-none"
          onClick={() =>
            cancelBookingInProgress(paymentIntent, bookingInProgress)
          }
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default FormNavButtons;
