import React from "react";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { roomSchema } from "./roomSchema";
import { useNavigate } from "react-router-dom";
import { createRoom, resetRoomsLoadingStatus } from "../../../redux/roomsSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../LoadingSpinner";

const RoomForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: roomsError } = useSelector((state) => state.rooms);

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
      .then((res) => {
        resetRoomsLoadingStatus();
        navigate("/admin/rooms");
      })
      .catch((err) => console.log("createRoomError", err));
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-lg-6 offset-lg-2">
          <h1>Add a room</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="container p-0 mt-3"
          >
            <div className="row g-2">
              {/* ROOM NAME */}
              <div className="col-12">
                <label htmlFor="name" className="form-label p-0">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  {...register("name")}
                  id="name"
                  className={`form-control ${errors.name && "is-invalid"}`}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>

              {/* ROOM CAPACITY */}
              <div className="col-12 col-lg-5">
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

              {/* ROOM PHOTO */}
              <div className="col-12 col-lg-7">
                <label
                  htmlFor="photo-url"
                  className="form-label text-start p-0"
                >
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

              {/* ROOMS ERROR */}
              {roomsError ? (
                <div className="col-12">
                  <p className="text-danger p-0">{roomsError}</p>
                </div>
              ) : (
                ""
              )}

              {/* SUBMIT BUTTON */}
              <div className="col-12 col-lg-6 mt-4">
                <button type="submit" className="btn btn-success w-100">
                  {loading === "pending" ? (
                    <LoadingSpinner color={"light"} size={"sm"} />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomForm;
