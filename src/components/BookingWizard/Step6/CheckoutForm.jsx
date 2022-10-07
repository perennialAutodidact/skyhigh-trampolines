import React, { useContext, useMemo, useState } from "react";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import FormNavButtons from "../common/FormNavButtons";
import LoadingSpinner from "../../LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../../../redux/bookingsSlice";
import { BookingWizardContext } from "../context";
import { getSelectedAddOns } from "../context/utils";
import {
  setStripeLoadingStatus,
  setStripeError,
} from "../../../redux/stripeSlice";

const CheckoutForm = ({ goBack, setError }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const appDispatch = useDispatch();
  const [wizardState, wizardDispatch] = useContext(BookingWizardContext);
  const { addOns, formData } = wizardState;
  const { signatureImageData, fullName, email, address } = formData;
  const { bookingInProgress } = useSelector((appState) => appState.bookings);
  const { loading: stripeLoadingStatus, error } = useSelector(
    (state) => state.stripe
  );

  const bookingData = useMemo(
    () => ({
      addOns: getSelectedAddOns(addOns).map((addOn) => {
        const { id, name, quantity, price, totalPrice } = addOn;
        return { id, name, quantity, price, totalPrice };
      }),
      waiverSignature: signatureImageData,
      customer: {
        fullName,
        email,
        address,
      },
    }),
    [addOns, signatureImageData, fullName, email, address]
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    appDispatch(setStripeLoadingStatus("pending"));
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      appDispatch(setStripeLoadingStatus("failed"));
      appDispatch(setStripeError({ error: result.error.message }));
    } else {
      appDispatch(setStripeLoadingStatus("succeeded"));
      appDispatch(
        updateBooking({
          bookingId: bookingInProgress?.id,
          ...bookingData,
        })
      );
      navigate("/booking/thank-you");
      // dispatch email thunk
      // redirect to thank you page
    }
  };
  //   if (!elements || !stripe) {
  //     return (
  //       <div className="my-5">
  //         <LoadingSpinner />
  //       </div>
  //     );
  //   }
  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />
      <FormNavButtons
        goBack={goBack}
        submitButtonText={
          stripeLoadingStatus === "pending" ? <LoadingSpinner /> : "Submit"
        }
      />
    </form>
  );
};

export default CheckoutForm;
