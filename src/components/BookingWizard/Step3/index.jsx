import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAddOnsList } from "../../../redux/addOnsSlice";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { step3Schema } from "../context/schema";
import {
  setInitialAddOnState,
  setProgressBarStep,
  updateForm,
} from "../context/actions";
import { getSelectedAddOns } from "../context/utils";
import LoadingSpinner from "../../LoadingSpinner";
import FormNavButtons from "../common/FormNavButtons";
import Accordion from "../common/Accordion";
import AccordionItem from "../common/Accordion/AccordionItem";
import AccordionCollapse from "../common/Accordion/AccordionCollapse";
import AddOnsList from "./AddOnsList";
import { updateBooking } from "../../../redux/bookingsSlice";
import { toMoney } from "../context/utils";

const Step3 = () => {
  const navigate = useNavigate();
  const appDispatch = useDispatch();
  const { addOns, loading: addOnsLoadingStatus } = useSelector(
    (appState) => appState.addOns
  );
  const [wizardState, wizardDispatch] = useContext(BookingWizardContext);
  const { bookingInProgress, loading: bookingsLoadingStatus } = useSelector(
    (appState) => appState.bookings
  );
  const initialValues = {
    addOnsDataExists: false,
  };
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(step3Schema),
  });

  const bookingData = useMemo(
    () => ({
      addOns: getSelectedAddOns(wizardState.addOns).map((addOn) => {
        const { id, name, quantity, price, totalPrice } = addOn;
        return { id, name, quantity, price, totalPrice };
      }),
      grandTotal: parseInt(
        toMoney(Number(wizardState.formData.grandTotal) * 100)
      ),
    }),
    [wizardState.addOns, wizardState.formData.grandTotal]
  );

  const addOnsDataIsValid = useCallback(
    () => wizardState.addOns.some((addOn) => addOn.quantity > 0),
    [wizardState.addOns]
  );

  const onSubmit = (formData) => {
    wizardDispatch(updateForm(formData));
    wizardDispatch(setProgressBarStep(4));
    navigate("/booking/step-4");
    appDispatch(
      updateBooking({ bookingId: bookingInProgress?.id, ...bookingData })
    );
  };

  const goBack = () => {
    navigate("/booking/step-2");
    wizardDispatch(setProgressBarStep(2));
  };

  useEffect(() => {
    setValue("addOnsDataExists", addOnsDataIsValid());
    clearErrors();
  }, [setValue, addOnsDataIsValid, clearErrors]);

  useEffect(() => {
    if (!!addOns && addOnsLoadingStatus === "idle") {
      appDispatch(getAddOnsList())
        .unwrap()
        .then((addOns) => {
          wizardDispatch(setInitialAddOnState(addOns));
        });
    }
  }, [addOns, addOnsLoadingStatus, appDispatch, wizardDispatch]);

  useEffect(() => {
    if (addOns && !addOnsDataIsValid() && wizardState.addOns.length===0) {
      wizardDispatch(setInitialAddOnState(addOns));
    }
  }, [wizardState.addOns, wizardDispatch, addOns, addOnsDataIsValid]);

  if (
    addOnsLoadingStatus === "pending" ||
    bookingsLoadingStatus === "pending"
  ) {
    return (
      <div className="conatiner text-center p-5">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="container px-0 pt-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container px-0 text-start"
      >
        {/* PRODUCT SELECT */}
        <div className="row px-0 mb-3">
          <div className="col-12">
            <label htmlFor="date" className="form-label p-0 m-0 d-flex gap-1 justify-content-center">
              <h3 className="m-0">Select Add-Ons</h3>{" "}
              <span className="text-danger fs-2">*</span>
            </label>
          </div>
        </div>

        {/* hidden input field to handle errors if no products are selected */}
        <input type="hidden" {...register("addOnDataExists")} />

        <Accordion>
          <AccordionItem
            // super hacky workaround for grouping all jump socks
            // organize addons into subcollections by category?
            item={{
              id: 1,
              photo:
                wizardState.addOns.length > 0 && wizardState.addOns[0].photo,
            }}
            headerText={"Jump Socks"}
          >
            <AccordionCollapse collapseId={1}>
              <AddOnsList addOns={wizardState.addOns} />
            </AccordionCollapse>
          </AccordionItem>
        </Accordion>

        {errors.addOnsDataExists && (
          <p className="text-danger text-center">
            {errors.addOnsDataExists.message}
          </p>
        )}

        <div className="container px-4">
          <FormNavButtons goBack={goBack} submitButtonText={"Next"} />
        </div>
      </form>
    </div>
  );
};

export default Step3;
