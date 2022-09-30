import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { updateForm, setProgressBarStep } from "../context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step6Schema } from "../context/schema";
import FormNavButtons from "../common/FormNavButtons";
const Step2 = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(BookingWizardContext);

  const initialValues = {
    arrivalTime: "",
  };
  const {
    handleSubmit,
    // formState: { errors },
  } = useForm({
    initialValues,
    resolver: yupResolver(step6Schema),
  });

  const onSubmit = (formData) => {
    dispatch(updateForm(formData));
    dispatch(setProgressBarStep(6));
    navigate("/booking/checkout");
  };


  const goBack = () => {
    navigate("/booking/step-5");
    dispatch(setProgressBarStep(5));
  };

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        <FormNavButtons goBack={goBack} submitButtonText={"Submit"} />
      </form>
    </div>
  );
};

export default Step2;
