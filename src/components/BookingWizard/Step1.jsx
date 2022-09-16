import React, { useContext } from "react";
import { BookingWizardContext } from "./context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step1Schema } from "./schema";

const Step1 = () => {
  const [state, dispatch] = useContext(BookingWizardContext);

  const initialValues = {
    date: new Date().toString(),
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    initialValues,
    resolver: yupResolver(step1Schema),
  });

  const onSubmit = (formData) => {};

  return (
    <div className="container pt-3">
      {/* <h1>Select Date</h1> */}

      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        {/* DATE */}
        <div className="row mb-3">
          <div className="col-12 col-lg-6 p-0">
            <label htmlFor="date" className="form-label p-0 d-flex gap-1">
              <h3>Select Date</h3> <span className="text-danger">*</span>
            </label>
            <input
              {...register("date")}
              id="date"
              type="date"
              value={new Date()}
              className={`form-control ${errors.date && "is-invalid"}`}
            />
            {errors.date && (
              <p className="text-danger">{errors.date.message}</p>
            )}
          </div>
        </div>

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

export default Step1;
