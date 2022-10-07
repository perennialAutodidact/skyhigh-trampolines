import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentIntent,
  updatePaymentIntent,
} from "../../../redux/stripeSlice";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { toMoney } from "../context/utils";
import { BookingWizardContext } from "../context";
import { setProgressBarStep } from "../context/actions";
import styles from "./CheckoutForm.module.scss";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase/client";
import LoadingSpinner from "../../LoadingSpinner";
import CheckoutForm from "./CheckoutForm";

const Step6 = ({ stripe }) => {
  const appDispatch = useDispatch();
  const navigate = useNavigate();
  const [state, dispatch] = useContext(BookingWizardContext);
  const { formData } = state;
  const { grandTotal, tax, subTotal, transactionFee } = formData;
  const {
    loading: stripeLoadingStatus,
    paymentIntent: { clientSecret, id: paymentIntentId },
    error: stripeError,
  } = useSelector((state) => state.stripe);
  const { bookingInProgress } = useSelector((appState) => appState.bookings);

  const goBack = () => {
    navigate("/booking/step-5");
    dispatch(setProgressBarStep(5));
  };

  useEffect(() => {
    if (bookingInProgress) {
      const paymentIntentData = {
        amount: toMoney(grandTotal) * 100,
        metadata: {
          bookingId: bookingInProgress.id,
          tax: (toMoney(tax) * 100).toFixed(0),
          subTotal: (toMoney(subTotal) * 100).toFixed(0),
          transactionFee,
        },
      };
      if (paymentIntentId) {
        appDispatch(
          updatePaymentIntent({
            id: paymentIntentId,
            paymentIntentData,
          })
        );
      } else {
        appDispatch(createPaymentIntent(paymentIntentData));
      }
    }
  }, [
    appDispatch,
    bookingInProgress,
    paymentIntentId,
    transactionFee,
    grandTotal,
    subTotal,
    tax,
  ]);

  if (!stripe || !clientSecret) {
    return (
      <div className="my-5">
        <LoadingSpinner />
      </div>
    );
  }

  const orderHistory = [
    { item: "Cloud Jumper", amount: 3, price: 100, bookingTime: "12:00" },
    { item: "Jump Socks (medium)", amount: 2, price: 7.98 },
  ];

  const handleMail = () => {
    console.log("calling mail function");
    //send mail with firebase functions
    const sendMail = httpsCallable(functions, "sendEmail");
    sendMail({
      to: "perennialautodidact@gmail.com",
      orderHistory,
      subject: "Sky High Order History for Dacen Jones",
      name: "Dacen Jones",
      text: "Here is your order history",
      bookingDate: "October 12, 2022.",
      idNumber: "123456789",
      currentDate: "September 30, 2022.",
      subtotal: 100,
      fee: 10,
      tax: 10,
      total: 120,
    })
      .then((result) => console.log(result.data))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container pt-3">
      <h3 className="mb-3">Checkout</h3>
      {stripeError && <p className="text-danger">{stripeError}</p>}
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
