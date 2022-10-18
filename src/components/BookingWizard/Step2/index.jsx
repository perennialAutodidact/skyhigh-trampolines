import React, { useCallback, useMemo, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsList } from "../../../redux/roomsSlice";
import {
  createBooking,
  updateBooking,
  getBookingsByDate,
} from "../../../redux/bookingsSlice";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import {
  updateForm,
  setProgressBarStep,
  setInitialRoomState,
  setRoomAvailabilities,
  setDisabledTimes,
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
import { getBookedRooms, getDisabledTimes } from "../context/utils";
import { getRoomAvailabilities } from "../../../utils";

const Step2 = () => {
  const appDispatch = useDispatch();
  const { rooms, loading: roomsLoadingState } = useSelector(
    (appState) => appState.rooms
  );
  const {
    bookingInProgress,
    loading: bookingLoading,
    bookingsByDate,
  } = useSelector((appState) => appState.bookings);
  const navigate = useNavigate();
  const [wizardState, wizardDispatch] = useContext(BookingWizardContext);

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

  const bookingData = useMemo(
    () => ({
      date: wizardState.formData.date,
      rooms: getBookedRooms(wizardState.rooms).map((room) => ({
        id: room.id,
        name: room.name,
        startTime: room.selectedStartTime,
        products: room.products.map((product) => ({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          duration: product.duration,
          price: product.price,
          totalPrice: product.totalPrice,
        })),
      })),
    }),
    [wizardState.formData.date, wizardState.rooms]
  );

  const createOrUpdateBooking = useCallback(() => {
    if (!bookingInProgress) {
      appDispatch(createBooking(bookingData));
    } else if (bookingInProgress) {
      appDispatch(
        updateBooking({ bookingId: bookingInProgress.id, ...bookingData })
      );
    }
  }, [bookingInProgress, bookingLoading, bookingData, appDispatch]);

  const onSubmit = (formData) => {
    wizardDispatch(updateForm({ rooms: wizardState.rooms }));
    wizardDispatch(setProgressBarStep(3));
    navigate("/booking/step-3");
    createOrUpdateBooking(bookingData);
  };

  const goBack = () => {
    navigate("/booking/step-1");
    wizardDispatch(setProgressBarStep(1));
  };

  const roomDataIsValid = useCallback(
    () =>
      wizardState.rooms.some(
        (room) =>
          room.selectedStartTime &&
          room.products.some((product) => product.quantity > 0)
      ),
    [wizardState.rooms]
  );

  useEffect(() => {
    setValue("productDataExists", roomDataIsValid());
    clearErrors();
  }, [setValue, roomDataIsValid, clearErrors]);

  useEffect(() => {
    if (rooms.length === 0 && roomsLoadingState === "idle") {
      (async () => {
        const roomData = await appDispatch(getRoomsList()).unwrap();
        await appDispatch(getBookingsByDate(wizardState.formData.date));

        wizardDispatch(setInitialRoomState(roomData));
      })();
    }
  }, [
    rooms,
    roomsLoadingState,
    appDispatch,
    wizardDispatch,
    wizardState.formData.date,
  ]);

  useEffect(() => {
    const date = wizardState.formData.date;
    if (!bookingsByDate[date]) {
      appDispatch(getBookingsByDate(date));
    } else {
      if (bookingsByDate[date]) {
        bookingsByDate[date].forEach((room) => {
          let availabilities = getRoomAvailabilities(
            room,
            wizardState.startTimes
          );
          wizardDispatch(setRoomAvailabilities(room.id, availabilities));

          let disabledTimes = getDisabledTimes(availabilities);
          wizardDispatch(setDisabledTimes(room.id, disabledTimes));
        });
      }
    }
  }, [
    bookingsByDate,
    bookingLoading,
    wizardState.formData.date,
    appDispatch,
    wizardState.startTimes,
    wizardDispatch,
  ]);

  if (roomsLoadingState === "pending") {
    return (
      <div className="conatiner text-center p-5">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="container-fluid px-0 pt-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container-fluid  px-0 text-start"
      >
        {/* PRODUCT SELECT */}
        <div className="row px-0 mb-3">
          <div className="col-12 col-lg-6 ">
            <label htmlFor="date" className="form-label p-0 d-flex gap-1">
              <h3>Select Products</h3> <span className="text-danger">*</span>
            </label>
          </div>

          {/* hidden input field to handle errors if no products are selected */}
          <input type="hidden" {...register("productDataExists")} />

          <Accordion>
            {wizardState.rooms.map((room, index) => (
              <AccordionItem item={room} headerText={room.name} key={room.id}>
                <AccordionCollapse collapseId={room.id}>
                  <StartTimeList room={room} />
                  {room.selectedStartTime && room.availabilities ? (
                    <ProductList room={room} />
                  ) : (
                    ""
                  )}
                </AccordionCollapse>
              </AccordionItem>
            ))}
          </Accordion>

          {errors.productDataExists && (
            <p className="text-danger text-center">
              {errors.productDataExists.message}
            </p>
          )}
        </div>
        <div className="container px-4">
          <FormNavButtons goBack={goBack} submitButtonText={"Next"} />
        </div>
      </form>
    </div>
  );
};

export default Step2;
