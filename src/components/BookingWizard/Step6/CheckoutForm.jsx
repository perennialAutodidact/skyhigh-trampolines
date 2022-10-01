import React from "react";
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import FormNavButtons from "../common/FormNavButtons";
const CheckoutForm = ({ goBack }) => {
  const stripe = useStripe()
  const elements = useElements();
  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />
      <FormNavButtons goBack={goBack} submitButtonText={"Submit"} />
    </form>
  );
};

export default CheckoutForm;
