import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addOnSchema } from "./schema";

const AddOnForm = ({ headerText, onSubmit }) => {

  const defaultValues = {
    name: "",
    price: "",
  };

  const {
    register, // provides onChange, onBlur, name and ref
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(addOnSchema), // handles form validation
  });

  return (
    <div className="container">
      <h1 className="text-start">{headerText}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        {/* ADDON NAME */}
        <div className="row mb-3">
          <label htmlFor="name" className="form-label p-0">
            Name <span className="text-danger">*</span>
          </label>
          <input
            {...register("name")}
            id="name"
            className={`form-control ${errors.name && "is-invalid"}`}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        {/* ADDON PRICE */}
        <div className="row mb-3">
          <label htmlFor="price" className="form-label p-0">
            Price <span className="text-danger">*</span>
          </label>
          <div className="input-group p-0">
            <div className="input-group-text">$</div>
            <input
              {...register("price")}
              id="price"
              className={`form-control ${errors.price && "is-invalid"}`}
              placeholder="e.g. 12.99"
            />
          </div>
          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>

        <div className="row mb-3">
          <div className="col col-4 col-lg-2 p-0">
            <button type="submit" className="btn btn-success w-100">
              {headerText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOnForm;
