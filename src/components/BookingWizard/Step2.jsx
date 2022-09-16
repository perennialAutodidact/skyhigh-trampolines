import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "./context";
import { updateForm, setProgressBarStep } from "./context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step2Schema } from "./schema";

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
    resolver: yupResolver(step2Schema),
  });

  const onSubmit = (formData) => {
    dispatch(updateForm(formData));
    dispatch(setProgressBarStep(3))
    navigate("/booking/step-3");
  };


  const ARRIVAL_TIMES = ["9:00AM", "9:30AM", "10:00AM"];

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        {/* TIME */}
        <div className="row mb-3">
          <div className="col-12 col-lg-6 p-0">
            <label htmlFor="date" className="form-label p-0 d-flex gap-1">
              <h3>Select Arrival Time</h3>{" "}
              <span className="text-danger">*</span>
            </label>
            <input
              {...register("time")}
              id="time"
              type="hidden"
              className={`form-control ${errors.date && "is-invalid"}`}
            />
            {errors.date && (
              <p className="text-danger">{errors.date.message}</p>
            )}
          </div>
        </div>
        <div className="d-flex gap-2">
          {ARRIVAL_TIMES.map((time) => (
            <div className="border border-grey p-2" key={time}>{time}</div>
          ))}
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

export default Step2;
