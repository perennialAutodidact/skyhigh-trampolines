import React, { useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../../redux/bookingsSlice";
import { BookingWizardContext } from "../context";
import FormNavButtons from "../common/FormNavButtons";
import LoadingSpinner from "../../LoadingSpinner";
import {
  setStripeLoadingStatus,
  setStripeError,
} from "../../../redux/stripeSlice";
import { checkoutSuccess } from "../context/actions";

const CheckoutForm = ({ goBack, setError }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const appDispatch = useDispatch();
  const { loading: stripeLoadingStatus } = useSelector(
    (appState) => appState.stripe
  );
  const { bookingInProgress } = useSelector((appState) => appState.bookings);
  const [wizardState, wizardDispatch] = useContext(BookingWizardContext);
  const { signatureImageData } = wizardState.formData;

  const bookingData = useMemo(
    () => ({
      waiverSignature: signatureImageData,
    }),
    [signatureImageData]
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    appDispatch(
      updateBooking({ bookingId: bookingInProgress?.id, ...bookingData })
    );

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
      wizardDispatch(checkoutSuccess(result.paymentIntent.id));
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
      <div className="container px-0 px-lg-3">
        <div className="container">
          <FormNavButtons
            goBack={goBack}
            submitButtonText={
              stripeLoadingStatus === "pending" ? (
                <LoadingSpinner color={"light"} size={"sm"} />
              ) : (
                "Submit"
              )
            }
          />
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
