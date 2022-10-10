import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { step4Schema } from "../context/schema";
import { updateForm, setProgressBarStep } from "../context/actions";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddressSearchInput from "./AddressSearchInput";

import FormNavButtons from "../common/FormNavButtons";

const Step4 = () => {
  const navigate = useNavigate();
  const [wizardState, wizardDispatch] = useContext(BookingWizardContext);
  const { fullName, email, address } = wizardState.formData;

  const initialValues = {
    fullName,
    email,
    address,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    initialValues,
    defaultValues: initialValues,
    resolver: yupResolver(step4Schema),
  });

  const onSubmit = (formData) => {
    wizardDispatch(updateForm(formData));
    wizardDispatch(setProgressBarStep(5));
    navigate("/booking/step-5");
  };

  const goBack = () => {
    wizardDispatch(setProgressBarStep(3));
    navigate("/booking/step-3");
  };

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        {/* CUSTOMER FULL NAME */}
        <div className="row mb-3">
          <label htmlFor="fullName" className="form-label">
            Name <span className="text-danger">*</span>
          </label>
          <input
            {...register("fullName")}
            id="fullName"
            className={`form-control ${errors.fullName && "is-invalid"}`}
          />
          {errors.fullName && (
            <p className="text-danger">{errors.fullName.message}</p>
          )}
        </div>

        {/* CUSTOMER EMAIL */}
        <div className="row mb-3">
          <label htmlFor="email" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            {...register("email")}
            id="email"
            className={`form-control ${errors.email && "is-invalid"}`}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        {/* CUSTOMER ADDRESS */}
        <div className="container-fluid px-0 mb-3">
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <AddressSearchInput formOnChange={field.onChange} />
            )}
          />
          {errors.address && (
            <p className="text-danger">{errors.address.message}</p>
          )}
        </div>

        <FormNavButtons submitButtonText={"Next"} goBack={goBack} />
      </form>
    </div>
  );
};

export default Step4;
