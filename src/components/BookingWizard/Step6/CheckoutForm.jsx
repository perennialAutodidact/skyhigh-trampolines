import React, { useContext, useMemo } from "react";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import FormNavButtons from "../common/FormNavButtons";
import LoadingSpinner from "../../LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../../../redux/bookingsSlice";
import { BookingWizardContext } from "../context";
import { getSelectedAddOns } from "../context/utils";
const CheckoutForm = ({ goBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const appDispatch = useDispatch();
  const [wizardState, wizardDispatch] = useContext(BookingWizardContext);
  const { addOns, formData } = wizardState;
  const { signatureImageData, fullName, email, address } = formData;
  const {
    bookingInProgress: { id: bookingId },
  } = useSelector((appState) => appState.bookings);

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

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      console.log(result.error);
    } else {
      appDispatch(updateBooking({ bookingId, bookingData }));
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
      <FormNavButtons goBack={goBack} submitButtonText={"Submit"} />
    </form>
  );
};

export default CheckoutForm;
