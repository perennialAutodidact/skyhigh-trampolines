import React, { useContext } from "react";
import dayjs from "dayjs";
import { useNavigate, Link } from "react-router-dom";
import { BookingWizardContext } from "./context";
import { updateForm, setProgressBarStep } from "./context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step2Schema } from "./schema";
import ProductSelect from "./ProductSelect";

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
    dispatch(setProgressBarStep(3));
    navigate("/booking/step-3");
  };

  const goBack = () => dispatch(setProgressBarStep(1));

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        {/* PRODUCT SELECT */}
        <div className="row mb-3">
          <div className="col-12 col-lg-6 p-0">
            <label htmlFor="date" className="form-label p-0 d-flex gap-1">
              <h3>Select Products</h3> <span className="text-danger">*</span>
            </label>

            {/* {errors.products && (
              <p className="text-danger">{errors.products.message}</p>
            )} */}
          </div>
        </div>

        <div className="accordion" id="accordionPanelsStayOpenExample">
          {TEMP_ROOM_DATA.map((roomData) => (
            <ProductSelect roomData={roomData} />
          ))}
        </div>

        <div className="row my-3 align-items-end">
          <div className="col-12 col-lg-2 p-0 mb-3 mb-lg-0 order-2 order-lg-1">
            <Link
              to="/booking"
              onClick={goBack}
              className="link-dark text-decoration-none"
            >
              Back
            </Link>
          </div>
          <div className="col col-12 col-lg-4 offset-lg-6 p-0 order-1 order-lg-2">
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

const TEMP_ROOM_DATA = [
  {
    id: "B4v0Zw7BHjXEMhsDq8K6",
    name: "Cloud Jumper",
    capacity: 25,
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
