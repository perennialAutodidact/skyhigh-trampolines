import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookingWizardContext } from "./context";
import { setProgressBarStep } from "./context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step6Schema } from "./schema";

const Checkout = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(BookingWizardContext);

  const initialValues = {
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    initialValues,
    resolver: yupResolver(step6Schema),
  });

  const onSubmit = (formData) => {
    console.log(state.formData)
  };

  const goBack = () => dispatch(setProgressBarStep(5));

  return (
    <div className="container pt-3">
      <h3>Checkout</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        <div className="row my-3 align-items-end">
          <div className="col-12 col-lg-2 p-0">
            <Link
              to="/booking/step-5"
              onClick={goBack}
              className="link-dark text-decoration-none"
            >
              Back
            </Link>
          </div>
          <div className="col col-12 col-lg-4 offset-lg-6 p-0">
            <button type="submit" className="btn btn-success w-100">
              Checkout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;