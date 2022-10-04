import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomList } from "../../../redux/roomsSlice";
import { createBooking } from "../../../redux/bookingsSlice";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import {
  updateForm,
  setProgressBarStep,
  setInitialRoomState,
} from "../context/actions";
import { step2Schema } from "../context/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Accordion from "../common/Accordion";
import FormNavButtons from "../common/FormNavButtons";
import LoadingSpinner from "../../LoadingSpinner";
import StartTimeList from "./StartTimeList";
import AccordionCollapse from "../common/Accordion/AccordionCollapse";
import ProductList from "./ProductList";
import AccordionItem from "../common/Accordion/AccordionItem";
import { getBookedRooms } from "../context/utils";

const Step2 = () => {
  const appDispatch = useDispatch();
  const { rooms, loading: roomsLoadingState } = useSelector(
    (appState) => appState.rooms
  );
  const navigate = useNavigate();
  const [state, dispatch] = useContext(BookingWizardContext);

  const initialValues = {
    productDataExists: false,
  };
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(step2Schema),
  });

  const onSubmit = (formData) => {
    dispatch(updateForm({ rooms: state.formData.rooms }));
    dispatch(setProgressBarStep(3));
    navigate("/booking/step-3");


    // appDispatch(
    //   createBooking({
    //     date: state.formData.date,
    //     dateCreated: new Date(),
    //     rooms: getBookedRooms(state.formData.rooms).map((room) => ({
    //       id: room.id,
    //       startTime: room.selectedStartTime,
    //       products: room.products.map((product) => ({
    //         id: product.id,
    //         name: product.name,
    //         quantity: product.quantity,
    //         duration: product.duration,
    //       })),
    //     })),
    //   })
    // );
  };

  const goBack = () => {
    navigate("/booking");
    dispatch(setProgressBarStep(1));
  };

  const roomDataIsValid = useCallback(
    () =>
      state.rooms.some(
        (room) =>
          room.selectedStartTime &&
          room.products.some((product) => product.quantity > 0)
      ),
    [state.rooms]
  );

  useEffect(() => {
    setValue("productDataExists", roomDataIsValid());
    clearErrors();
  }, [setValue, roomDataIsValid, clearErrors]);

  useEffect(() => {
    if (!!rooms && roomsLoadingState === "idle") {
      appDispatch(getRoomList())
        .unwrap()
        .then((rooms) => {
          dispatch(setInitialRoomState(rooms));
        });
    }
  }, [rooms, roomsLoadingState, appDispatch, dispatch]);

  if (roomsLoadingState === "pending") {
    return (
      <div className="conatiner text-center p-5">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="container px-0 pt-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container-fluid px-0 text-start"
      >
        {/* PRODUCT SELECT */}
        <div className="row px-2 mb-3">
          <div className="col-12 col-lg-6 p-2 px-lg-2">
            <label htmlFor="date" className="form-label p-0 d-flex gap-1">
              <h3>Select Products</h3> <span className="text-danger">*</span>
            </label>
          </div>
        </div>

        {/* hidden input field to handle errors if no products are selected */}
        <input type="hidden" {...register("productDataExists")} />

        <Accordion>
          {state.rooms.map((room, index) => (
            <AccordionItem item={room} headerText={room.name} key={room.id}>
              <AccordionCollapse collapseId={room.id}>
                <StartTimeList room={room} />

                <ProductList products={room.products} roomId={room.id} />
              </AccordionCollapse>
            </AccordionItem>
          ))}
        </Accordion>

        {errors.productDataExists && (
          <p className="text-danger text-center">
            {errors.productDataExists.message}
          </p>
        )}

        <FormNavButtons goBack={goBack} submitButtonText={"Next"} />
      </form>
    </div>
  );
};

export default Step2;
