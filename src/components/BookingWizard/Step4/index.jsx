import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { step4Schema } from "../context/schema";
import { updateForm, setProgressBarStep } from "../context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormNavButtons from "../common/FormNavButtons";
const Step4 = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(BookingWizardContext);

  const initialValues = {
    fullName: "",
    email: "",
    address: "",
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

  const goBack = () => {
    navigate("/booking/step-3");
    dispatch(setProgressBarStep(3));
  };

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">

        {/* CUSTOMER FULL NAME */}
        <div className="row mb-3">
          <label htmlFor="fullName" className="form-label p-0">
            Name <span className="text-danger">*</span>
          </label>
          <input
            {...register("fullName")}
            id="fullName"
            className={`form-control ${errors.fullName && "is-invalid"}`}
          />
          {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
        </div>

        {/* CUSTOMER EMAIL */}
        <div className="row mb-3">
          <label htmlFor="email" className="form-label p-0">
            Email <span className="text-danger">*</span>
          </label>
          <input
            {...register("email")}
            id="email"
            className={`form-control ${errors.email && "is-invalid"}`}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        {/* CUSTOMER ADDRESS */}
        <div className="row mb-3">
          <label htmlFor="address" className="form-label p-0">
            Address <span className="text-danger">*</span>
          </label>
          <input
            {...register("address")}
            id="address"
            className={`form-control ${errors.address && "is-invalid"}`}
          />
          {errors.address && <p className="text-danger">{errors.address.message}</p>}
        </div>

        <FormNavButtons submitButtonText={"Next"} goBack={goBack} />
      </form>
    </div>
  );
};

export default Step4;
