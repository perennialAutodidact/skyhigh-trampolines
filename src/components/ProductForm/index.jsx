import React from "react";
import { productSchema } from "./schema";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ProductForm = ({ rooms, productTypes, durations, onSubmit }) => {
  // this data will come from props
  rooms = [
    {
      name: "Room 1",
      id: "000001",
    },
    {
      name: "Room 2",
      id: "000002",
    },
    {
      name: "Room 3",
      id: "000003",
    },
  ];

  // this data will come from props
  productTypes = [
    {
      name: "First Product Type",
      id: "000001",
    },
    {
      name: "Second Product Type",
      id: "000002",
    },
  ];

  // this data will come from props
  durations = [
    {
      name: "60 minutes",
      value: "60",
    },
    {
      name: "90 minutes",
      value: "90",
    },
    {
      name: "120 minutes",
      value: "120",
    },
    {
      name: "All Day",
      value: "day",
    },
  ];

  const defaultValues = {
    name: "",
    description: "",
    productType: "",
    room: "",
    duration: "",
    price: "",
  };

  const {
    register, // provides onChange, onBlur, name and ref
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(productSchema), // handles form validation
  });

  const imageField = useController({ control, name: "photo" });

  const imageFieldOnChange = (e) => {
    setValue("photo", e.target.files[0]);
  };

  onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}
      className="container text-start"
    >
      {/* PRODUCT NAME */}
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

      {/* PRODUCT DESCRIPTION */}
      <div className="row mb-3">
        <label htmlFor="description" className="form-label p-0">
          Description <span className="text-danger">*</span>
        </label>
        <input
          {...register("description")}
          id="description"
          className={`form-control ${errors.description && "is-invalid"}`}
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      {/* PRODUCT PRICE */}
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
        {errors.price && <p className="text-danger">{errors.price.message}</p>}
      </div>

      {/* PRODUCT TYPE */}
      <div className="row mb-3">
        <label htmlFor="productType" className="form-label text-start p-0">
          Product Type <span className="text-danger">*</span>
        </label>
        <select
          {...register("productType")}
          id="productType"
          className={`form-select  ${errors.productType && "is-invalid"}`}
        >
          <option value="">Select a product type</option>
          {productTypes.map((productType) => (
            <option value={productType.id} key={productType.id}>
              {productType.name}
            </option>
          ))}
        </select>
        {errors.productType && (
          <p className="text-danger">{errors.productType.message}</p>
        )}
      </div>

      {/* PRODUCT ROOM */}
      <div className="row mb-3">
        <label htmlFor="room-id" className="form-label text-start p-0">
          Room <span className="text-danger">*</span>
        </label>
        <select
          {...register("room")}
          id="room-id"
          className={`form-select ${errors.room && "is-invalid"}`}
        >
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option value={room.id} key={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        {errors.room && <p className="text-danger">{errors.room.message}</p>}
      </div>

      {/* PRODUCT DURATION */}
      <div className="row mb-3">
        <label htmlFor="duration-id" className="form-label text-start p-0">
          Duration <span className="text-danger">*</span>
        </label>
        <select
          {...register("duration")}
          id="duration-id"
          className={`form-select ${errors.duration && "is-invalid"}`}
        >
          <option value="">Select a duration</option>
          {durations.map((duration) => (
            <option value={duration.id} key={duration.id}>
              {duration.name}
            </option>
          ))}
        </select>
        {errors.duration && (
          <p className="text-danger">{errors.duration.message}</p>
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
        {errors.photo && <p className="text-danger">{errors.photo.message}</p>}
      </div>

      <div className="row mb-3">
        <div className="col col-4 col-lg-2 p-0">
          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
