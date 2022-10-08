import React from "react";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import FormNavButtons from "../common/FormNavButtons";
import LoadingSpinner from "../../LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import {
  setStripeLoadingStatus,
  setStripeError,
} from "../../../redux/stripeSlice";

const CheckoutForm = ({ goBack, setError }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const appDispatch = useDispatch();
  const { loading: stripeLoadingStatus } = useSelector((state) => state.stripe);

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
      navigate("/booking/thank-you");
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
          stripeLoadingStatus === "pending" ? (
            <LoadingSpinner color={"light"} />
          ) : (
            "Submit"
          )
        }
      />
    </form>
  );
};

export default CheckoutForm;
