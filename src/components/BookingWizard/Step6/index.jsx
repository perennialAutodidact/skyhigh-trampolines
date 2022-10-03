import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentIntent } from "../../../redux/stripeSlice";
import { useCreateOrUpdateBooking } from "../../../hooks/useCreateOrUpdateBooking";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { toMoney } from "../context/utils";

import { BookingWizardContext } from "../context";
import { setProgressBarStep } from "../context/actions";
import styles from "./CheckoutForm.module.scss";
import LoadingSpinner from "../../LoadingSpinner";
import CheckoutForm from "./CheckoutForm";

const Step6 = ({ stripe }) => {
  const appDispatch = useDispatch();
  const navigate = useNavigate();
  const [state, dispatch] = useContext(BookingWizardContext);
  const { formData } = state;
  const { grandTotal, tax } = formData;
  const {
    paymentIntent: { clientSecret, id: paymentIntentId },
  } = useSelector((state) => state.stripe);
  const {
    bookingInProgress: { id: bookingId },
  } = useCreateOrUpdateBooking(formData);

  const goBack = () => {
    navigate("/booking/step-5");
    dispatch(setProgressBarStep(5));
  };

  useEffect(() => {
    if (bookingId && tax && grandTotal && paymentIntentId) {
      appDispatch(
        updatePaymentIntent({
          id: paymentIntentId,
          data: {
            amount: toMoney(grandTotal) * 100,
            metadata: {
              bookingId,
              tax,
            },
          },
        })
      );
    }
  }, [appDispatch, grandTotal, paymentIntentId, bookingId, tax]);

  if (!stripe || !clientSecret) {
    return (
      <div className="my-5">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container pt-3">
      <h3 className="mb-3">Checkout</h3>
      <Elements
        stripe={stripe}
        options={{
          clientSecret,
          appearance: {
            variables: {
              colorDanger: styles.danger,
            },
          },
        }}
      >
        <CheckoutForm goBack={goBack} />
      </Elements>
    </div>
  );
};

export default Step6;
