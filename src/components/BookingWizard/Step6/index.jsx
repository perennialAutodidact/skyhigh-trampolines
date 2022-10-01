import React, { useContext, useState, useMemo } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase/client";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { setProgressBarStep, setPaymentIntent } from "../context/actions";
import {
  getBookedRooms,
  getSelectedAddOns,
  toMoney,
  getRoomsPaymentData,
  getAddOnsPaymentData,
  getHeadCount,
} from "../context/utils";
import { Elements, PaymentElement, useElements } from "@stripe/react-stripe-js";
import FormNavButtons from "../common/FormNavButtons";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import CheckoutForm from "./CheckoutForm";
import styles from "./CheckoutForm.module.scss";

const Step6 = () => {
  const stripe = useMemo(
    () => loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY),
    []
  );
  // const elements = useElements()
  const navigate = useNavigate();
  const [state, dispatch] = useContext(BookingWizardContext);
  const {
    grandTotal,
    formData: { date, rooms, addOns, signatureImageData, customerDetails },
    paymentIntent,
  } = state;

  const goBack = () => {
    navigate("/booking/step-5");
    dispatch(setProgressBarStep(5));
  };

  // metadata: JSON.stringify({
  //   date,
  //   customerDetails,
  //   rooms: getRoomsPaymentData(rooms),
  //   addOns: getAddOnsPaymentData(addOns),
  // }),
  useEffect(() => {
    const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");
    // const updatePaymentIntent = httpsCallable(functions, 'updatePaymentIntent')

    if (!paymentIntent.clientSecret) {
      (async () => {
        const response = await createPaymentIntent({
          amount: toMoney(grandTotal) * 100,
          metadata: {
            rooms: JSON.stringify(
              getBookedRooms(rooms).map((room) => ({
                room: room.id,
                startTime: room.selectedStartTime,
                products: room.products.map((product) => ({
                  duration: product.duration,
                  quantity: product.quantity,
                })),
              }))
            ),
          },
        });
        const { clientSecret, id } = response.data;
        dispatch(setPaymentIntent({ clientSecret, id }));
      })();
    }
  }, [paymentIntent, grandTotal, dispatch, rooms]);

  if (!stripe || !paymentIntent.clientSecret) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container pt-3">
      <Elements
        stripe={stripe}
        options={{
          clientSecret: paymentIntent.clientSecret,
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
