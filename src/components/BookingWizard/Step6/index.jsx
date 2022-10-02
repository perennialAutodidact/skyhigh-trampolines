import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { setProgressBarStep } from "../context/actions";
import {
  getBookedRooms,
  getSelectedAddOns,
  toMoney,
  getRoomsPaymentData,
  getAddOnsPaymentData,
  getHeadCount,
} from "../context/utils";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import CheckoutForm from "./CheckoutForm";
import styles from "./CheckoutForm.module.scss";
import { createPaymentIntent } from "../../../redux/stripeSlice";

const Step6 = ({ stripe }) => {
  const appDispatch = useDispatch();
  const navigate = useNavigate();
  const { paymentIntent } = useSelector((state) => state.stripe);
  const [state, dispatch] = useContext(BookingWizardContext);
  const {
    grandTotal,
    formData: { date, rooms, addOns, signatureImageData, customerDetails },
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
    if (!paymentIntent.clientSecret) {
      const data = {
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
      };
      appDispatch(createPaymentIntent(data)).unwrap();
    }
  }, [paymentIntent, grandTotal, dispatch, rooms]);

  if (!stripe || !paymentIntent.clientSecret) {
    return (
      <div className="my-5">
        <LoadingSpinner />;
      </div>
    );
  }

  return (
    <div className="container pt-3">
      <h3 className="mb-3">Checkout</h3>
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
