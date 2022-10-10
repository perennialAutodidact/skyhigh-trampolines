import React from "react";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { roomSchema } from "./roomSchema";

import { createRoom } from "../../../redux/roomsSlice";
import { useDispatch } from "react-redux";

const RoomForm = () => {
  const dispatch = useDispatch();

  const defaultValues = {
    name: "",
    capacity: 0,
  };

  const {
    register, // provides onChange, onBlur, name and ref
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(roomSchema), // handles form validation
  });

  const imageField = useController({ control, name: "photo" });

  const imageFieldOnChange = (e) => {
    setValue("photo", e.target.files[0]);
  };

  const onSubmit = (formData) => {
    dispatch(createRoom(formData))
      .unwrap()
      .then((res) => console.log("res", res))
      .catch((err) => console.log("createRoomError", err));
  };

  return (
    <div className="container">
      <h1 className="text-start">Add a room</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        {/* ROOM NAME */}
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

        {/* ROOM CAPACITY */}
        <div className="row mb-3">
          <label htmlFor="capacity" className="form-label p-0">
            Capacity <span className="text-danger">*</span>
          </label>
          <input
            {...register("capacity")}
            id="capacity"
            className={`form-control ${errors.capacity && "is-invalid"}`}
          />
          {errors.capacity && (
            <p className="text-danger">{errors.capacity.message}</p>
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

export default RoomForm;
