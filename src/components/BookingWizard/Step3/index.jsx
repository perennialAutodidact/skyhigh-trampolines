import React, { useContext, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddOnsList } from "../../../redux/addOnsSlice";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { step3Schema } from "../context/schema";
import {
  setInitialAddOnState,
  setProgressBarStep,
  updateForm,
} from "../context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingSpinner from "../../LoadingSpinner";
import FormNavButtons from "../common/FormNavButtons";
import Accordion from "../common/Accordion";
import AccordionItem from "../common/Accordion/AccordionItem";
import AccordionCollapse from "../common/Accordion/AccordionCollapse";
import AddOnsList from "./AddOnsList";

const Step3 = () => {
  const navigate = useNavigate();
  const appDispatch = useDispatch();
  const { addOns, loading: addOnsLoadingState } = useSelector(
    (appState) => appState.addOns
  );
  const [state, dispatch] = useContext(BookingWizardContext);

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

  const addOnDataIsValid = useCallback(
    () => state.formData.addOns.some((addOn) => addOn.quantity > 0),
    [state.formData.addOns]
  );

  const onSubmit = (formData) => {
    dispatch(updateForm(formData));
    dispatch(setProgressBarStep(4));
    navigate("/booking/step-4");
  };

  const goBack = () => dispatch(setProgressBarStep(2));

  useEffect(() => {
    setValue("addOnDataExists", addOnDataIsValid());
    clearErrors();
  }, [setValue, addOnDataIsValid, clearErrors]);

  useEffect(() => {
    if (!!addOns && addOnsLoadingState === "idle") {
      appDispatch(getAddOnsList())
        .unwrap()
        .then((addOns) => {
          console.log("ADDONS", addOns);
          dispatch(setInitialAddOnState(addOns));
        });
    }
  }, [addOns, addOnsLoadingState, appDispatch, dispatch]);

  if (addOnsLoadingState === "pending") {
    return (
      <div className="conatiner text-center p-5">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        {/* PRODUCT SELECT */}
        <div className="row px-2 mb-3">
          <div className="col-12 col-lg-6 p-2 px-lg-2">
            <label htmlFor="date" className="form-label p-0 d-flex gap-1">
              <h3>Select Products</h3> <span className="text-danger">*</span>
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
                state.formData.addOns.length > 0 &&
                state.formData.addOns[0].photo,
            }}
            headerText={"Jump Socks"}
          >
            <AccordionCollapse collapseId={1}>
              <AddOnsList addOns={state.formData.addOns} />
            </AccordionCollapse>
          </AccordionItem>
        </Accordion>

        {errors.addOnsDataExists && (
          <p className="text-danger text-center">
            {errors.addOnsDataExists.message}
          </p>
        )}

        <FormNavButtons
          backHref={"/booking"}
          submitButtonText={"Next"}
          goBack={goBack}
        />
      </form>
    </div>
  );
};

export default Step3;
