import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "./context";
import { updateForm, setProgressBarStep } from "./context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step6Schema } from "./schema";

const Step2 = () => {
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
    resolver: yupResolver(step6Schema),
  });

  const onSubmit = (formData) => {
    dispatch(updateForm(formData));
    dispatch(setProgressBarStep(6))
    navigate("/booking/checkout");
  };


  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
       

        <div className="row mb-3">
          <div className="col col-4 offset-8 col-lg-2 offset-lg-10 p-0">
            <button type="submit" className="btn btn-success w-100">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step2;
