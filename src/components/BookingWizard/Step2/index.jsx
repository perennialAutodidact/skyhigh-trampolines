import React, { useContext, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomList } from "../../../redux/roomsSlice";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import {
  initialState as productSelectInitialState,
  ProductSelectContext,
} from "./context";
import { productSelectReducer } from "./context/reducer";
import { updateForm, setProgressBarStep } from "../context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step2Schema } from "../schema";
import RoomAccordion from "./RoomAccordion";
import FormNavButtons from "../FormNavButtons";
import LoadingSpinner from "../../LoadingSpinner";
import { setInitialRoomState } from "./context/actions";

const Step2 = () => {
  const appDispatch = useDispatch();
  const { rooms, loading: roomsLoadingState } = useSelector(
    (appState) => appState.rooms
  );
  const navigate = useNavigate();
  const [wizardState, wizardDispatch] = useContext(BookingWizardContext);
  const [state, dispatch] = useReducer(
    productSelectReducer,
    productSelectInitialState
  );

  const initialValues = {
    ...wizardState.formData,
  };
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    initialValues,
    resolver: yupResolver(step2Schema),
  });

  const onSubmit = (formData) => {
    wizardDispatch(updateForm(formData));
    wizardDispatch(setProgressBarStep(3));
    navigate("/booking/step-3");
  };

  const goBack = () => wizardDispatch(setProgressBarStep(1));

  useEffect(() => {
    if (!!rooms && roomsLoadingState === "idle") {
      appDispatch(getRoomList()).then((rooms) => {
        dispatch(setInitialRoomState(TEMP_ROOM_DATA));
      });
    }
  }, [rooms, roomsLoadingState, appDispatch]);

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

            {/* {errors.products && (
              <p className="text-danger">{errors.products.message}</p>
            )} */}
          </div>
        </div>

        <ProductSelectContext.Provider value={[state, dispatch]}>
          {state.rooms.map((room, index) => (
            <RoomAccordion roomIndex={index} key={room.id} />
          ))}
        </ProductSelectContext.Provider>

        <FormNavButtons
          backHref={"/booking"}
          submitButtonText={"Next"}
          goBack={goBack}
        />
      </form>
    </div>
  );
};

export default Step2;

const TEMP_ROOM_DATA = [
  {
    id: "B4v0Zw7BHjXEMhsDq8K6",
    name: "Cloud Jumper",
    capacity: 25,
    photo:
      "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/rooms%2Fclouds-pero-kalimero.jpg?alt=media&token=d93817e5-4783-4717-bff4-f6e1756675ae",
    products: [
      {
        name: "60-Minute Ticket",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/products%2F60-minute-ticket.png?alt=media&token=ddcbdd76-ebc8-4f7f-b022-8adc3789e105",
        duration: '"60"',
        productType: "ticket",
        description: "Allows one person entry to Cloud Jumper for 60 minutes. ",
        room: "B4v0Zw7BHjXEMhsDq8K6",
        price: 2999,
        id: "iXJSE5x0xNvhyjSoDbPc",
      },
      {
        description: "Allows one person entry to Cloud Jumper for 90 minutes. ",
        price: "3499",
        room: "B4v0Zw7BHjXEMhsDq8K6",
        productType: "ticket",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/products%2F90-minute-ticket.png?alt=media&token=0cc77d74-f8b0-416a-927d-c2b05a5cf78c",
        duration: "90",
        name: "90-Minute Ticket",
        id: "UYY1RK2Qj9Vu0xmItVca",
      },
      {
        name: "120-Minute Ticket",
        duration: "120",
        description:
          "Allows one person entry to Cloud Jumper for 120 minutes. ",
        productType: "ticket",
        price: "3999",
        room: "B4v0Zw7BHjXEMhsDq8K6",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/products%2F120-minute-ticket.png?alt=media&token=f97bb216-8315-4c84-9460-825cdd772294",
        id: "gSqQYQbT5EcjrWGj1JEh",
      },
      {
        room: "B4v0Zw7BHjXEMhsDq8K6",
        name: "All-Day Ticket",
        price: "4999",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/products%2Fall-day-ticket.png?alt=media&token=843c3643-f3fd-4993-a450-72e8186528b2",
        description:
          "Allows one person entry to Cloud Jumper for the entire day.",
        productType: "ticket",
        duration: "day",
        id: "7QyddfezOUic5tFWj8Jy",
      },
    ],
  },
  {
    id: "fk6dUV1ikU42lS1iMhBo",
    name: "Cosmic Leap",
    capacity: 50,
    photo:
      "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/rooms%2Fcosmos.jpg?alt=media&token=46ede597-ef63-4409-9a70-c66b2cad34a2",
    products: [
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/products%2F60-minute-ticket.png?alt=media&token=63c84458-863a-44ff-a3fd-d64d1b2b4bcc",
        name: "60-Minute Ticket",
        productType: "ticket",
        room: "fk6dUV1ikU42lS1iMhBo",
        price: "2999",
        description: "Allows one person entry to Cosmic Leap for 60 minutes.",
        duration: "60",
        id: "2FApJshxEcFKkOU8JLHc",
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/products%2F90-minute-ticket.png?alt=media&token=76a1a4c4-d502-4cfa-b3a9-025f6339ee3d",
        productType: "ticket",
        price: "3499",
        duration: "90",
        name: "90-Minute Ticket",
        room: "fk6dUV1ikU42lS1iMhBo",
        description: "Allows one person entry to Cosmic Leap for 90 minutes.",
        id: "rqt1FUT7QIMPy1SLauD6",
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/products%2F120-minute-ticket.png?alt=media&token=28bc1a7c-3be3-457b-992c-9f59a04914d4",
        price: "3999",
        description: "Allows one person entry to Cosmic Leap for 120 minutes.",
        room: "fk6dUV1ikU42lS1iMhBo",
        productType: "ticket",
        name: "120-Minute Ticket",
        duration: "120",
        id: "dwrG2uhyZlWctjtoAHh5",
      },
      {
        name: "All-Day Ticket",
        price: "3999",
        room: "fk6dUV1ikU42lS1iMhBo",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/products%2Fall-day-ticket.png?alt=media&token=a6616c3d-e2e6-4f3a-b7a7-6ef664fa9a94",
        duration: "day",
        productType: "ticket",
        description:
          "Allows one person entry to Cosmic Leap for the entire day.",
        id: "oz8QKWEkKRg4mxmQda8E",
      },
    ],
  },
];
