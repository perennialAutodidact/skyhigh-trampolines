import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { step4Schema } from "../context/schema";
import { updateForm, setProgressBarStep } from "../context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Step4 = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(BookingWizardContext);

  const initialValues = {
    arrivalTime: "",
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    initialValues,
    resolver: yupResolver(step4Schema),
  });

  const onSubmit = (formData) => {
    dispatch(updateForm(formData));
    dispatch(setProgressBarStep(5));
    navigate("/booking/step-5");
  };

  const goBack = () => dispatch(setProgressBarStep(3));

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        <div className="row my-3 align-items-end">
          <div className="col-12 col-lg-2 p-0 mb-3 mb-lg-0 order-2 order-lg-1">
            <Link
              to="/booking/step-3"
              onClick={goBack}
              className="link-dark text-decoration-none"
            >
              Back
            </Link>
          </div>
          <div className="col col-12 col-lg-4 offset-lg-6 p-0 order-1 order-lg-2">
            <button type="submit" className="btn btn-success w-100">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step4;
