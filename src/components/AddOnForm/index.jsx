import React from "react";
import { useDispatch } from "react-redux";
import { createAddOn } from "../../redux/addOnsSlice";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addOnSchema } from "./schema";

const AddOnForm = () => {
  const dispatch = useDispatch();

  const defaultValues = {
    name: "",
    price: "",
  };

  const {
    register, // provides onChange, onBlur, name and ref
    control,
    setValue,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(addOnSchema), // handles form validation
  });

  const imageField = useController({ control, name: "photo" });

  const imageFieldOnChange = (e) => {
    setValue("photo", e.target.files[0]);
  };

  const onSubmit = (formData) => {
    dispatch(createAddOn(formData));
  };
  return (
    <div className="container">
      <h1>Add an add-on</h1>
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

        <div className="row mb-4">
          <label htmlFor="photo-url" className="form-label text-start p-0">
            Photo <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            multiple
            name={"photo"}
            ref={imageField.ref}
            onChange={imageFieldOnChange}
            id="photo"
            className={`form-control ${errors.photo && "is-invalid"}`}
          />
          {errors.photo && (
            <p className="text-danger">{errors.photo.message}</p>
          )}
        </div>
        <div className="row mb-3">
          <div className="col col-4 col-lg-2 p-0">
            <button type="submit" className="btn btn-success w-100">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOnForm;
