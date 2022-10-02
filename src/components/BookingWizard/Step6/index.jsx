import React, { useContext, useMemo } from "react";
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
    formData: {
      date,
      rooms,
      addOns,
      tax,
      SALES_TAX_RATE,
      TRANSACTION_FEE,
      signatureImageData,
      fullName,
      email,
      address,
    },
  } = state;

  const bookingData = useMemo(
    () => ({
      amount: toMoney(grandTotal) * 100,
      metadata: {
        tax,
        salesTaxRate: SALES_TAX_RATE,
        transactionFee: TRANSACTION_FEE,
        date,
        customer: JSON.stringify({
          fullName,
          email,
          address,
        }),
        rooms: JSON.stringify(
          getBookedRooms(rooms).map((room) => ({
            room: room.id,
            startTime: room.selectedStartTime,
            headCount: room.headCount,
            products: room.products.map((product) => ({
              id: product.id,
              duration: product.duration,
              quantity: product.quantity,
              price: product.price,
              totalPrice: toMoney(product.totalPrice) * 100,
            })),
          }))
        ),
        addOns: JSON.stringify(
          getSelectedAddOns(addOns).map((addOn) => ({
            id: addOn.id,
            name: addOn.name,
            quantity: addOn.quantity,
            price: addOn.price,
            totalPrice: toMoney(addOn.totalPrice) * 100,
          }))
        ),
      },
    }),
    [
      grandTotal,
      date,
      rooms,
      addOns,
      fullName,
      email,
      address,
      toMoney,
      getBookedRooms,
      getSelectedAddOns,
      getHeadCount,
    ]
  );

  const goBack = () => {
    navigate("/booking/step-5");
    dispatch(setProgressBarStep(5));
  };

  useEffect(() => {
    if (!paymentIntent.clientSecret) {
      appDispatch(createPaymentIntent(bookingData));
    } else {
      //   appDispatch(updatePaymentIntent(bookingData));
    }
  }, [paymentIntent, dispatch, bookingData]);

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
