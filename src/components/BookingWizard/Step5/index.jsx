import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { updateForm, setProgressBarStep } from "../context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step5Schema } from "../context/schema";
import Waiver from "./Waiver";

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

  const goBack = () => dispatch(setProgressBarStep(4));

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
        <div className="row my-3 align-items">
          <div className="col-12 col-lg-2 p-0 mt-3 mt-lg-0 order-2 order-lg-1">
            <Link
              to="/booking/step-4"
              onClick={goBack}
              className="link-dark text-decoration-none"
            >
              Back
            </Link>
          </div>
          <div className="col-12 col-lg-4 offset-lg-6 p-0 order-1 order-lg-2">
            <button type="submit" className="btn btn-success w-100">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step5;
