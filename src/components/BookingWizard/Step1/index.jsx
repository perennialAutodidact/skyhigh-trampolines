import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { step1Schema } from "../context/schema";
import { updateForm, setProgressBarStep } from "../context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CalendarDatePicker from "./CalendarDatePicker";
import FormNavButtons from "../common/FormNavButtons";

const Step1 = () => {
  const navigate = useNavigate();
  const [wizardState, wizardDispatch] = useContext(BookingWizardContext);

  const initialValues = {
    date: wizardState.formData.date,
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    initialValues,
    resolver: yupResolver(step1Schema),
  });

  const onSubmit = (formData) => {
    wizardDispatch(updateForm(formData));
    wizardDispatch(setProgressBarStep(2));
    navigate("/booking/step-2");
  };

  const goBack = () => {
    navigate("/");
    wizardDispatch(setProgressBarStep(1));
  };

  useEffect(() => {
    setValue("date", wizardState.formData.date);
  }, [wizardState.formData.date, setValue]);

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        {/* DATE */}
        <div className="row mb-3">
          <div className="col-12 p-0">
            <label htmlFor="date" className="form-label p-0 d-flex gap-1">
              <h3>Select Date</h3> <span className="text-danger">*</span>
            </label>
            <input
              type="hidden"
              {...register("date")}
              value={initialValues.date}
            />
            <CalendarDatePicker selectedDate={wizardState.formData.date} />
            {errors.date && (
              <p className="text-danger">{errors.date.message}</p>
            )}
          </div>
        </div>

        <FormNavButtons goBack={goBack} submitButtonText={"Next"} />
      </form>
    </div>
  );
};

export default Step1;
