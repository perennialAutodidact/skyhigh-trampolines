import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { updateForm, setProgressBarStep } from "../context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step5Schema } from "../context/schema";
import Waiver from "./Waiver";
import FormNavButtons from "../common/FormNavButtons";

const Step5 = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(BookingWizardContext);

  const initialValues = {
    waiverAgreed: true,
    signatureImageData: "",
  };
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(step5Schema),
  });

  const onSubmit = (formData) => {
    console.log(formData);
    dispatch(updateForm(formData));
    dispatch(setProgressBarStep(6));
    navigate("/booking/checkout");
  };

  const goBack = () => {
    navigate("/booking/step-4");
    dispatch(setProgressBarStep(4));
  };

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        <h3 className="mb-3">Sign the Waiver</h3>
        <Waiver
          register={register}
          setValue={setValue}
          errors={errors}
          clearErrors={clearErrors}
        />
        <FormNavButtons goBack={goBack} submitButtonText={"Next"} />
      </form>
    </div>
  );
};

export default Step5;
