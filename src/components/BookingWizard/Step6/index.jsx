import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookingWizardContext } from "../context";
import { updateForm, setProgressBarStep } from "../context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step6Schema } from "../context/schema";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase/client";

const Step2 = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(BookingWizardContext);

  const initialValues = {
    arrivalTime: "",
  };
  const {
    handleSubmit,
    // formState: { errors },
  } = useForm({
    initialValues,
    resolver: yupResolver(step6Schema),
  });

  const onSubmit = (formData) => {
    dispatch(updateForm(formData));
    dispatch(setProgressBarStep(6));
    navigate("/booking/checkout");
  };

  const goBack = () => dispatch(setProgressBarStep(1));

  const orderHistory = [
    { item: "Cloud Jumper", amount: 3, price: 100, bookingTime: "12:00" },
    { item: "Jump Socks (medium)", amount: 2, price: 7.98 },
  ];

  const handleMail = () => {
    console.log("calling mail function");
    //send mail with firebase functions
    const sendMail = httpsCallable(functions, "sendEmail");
    sendMail({
      to: "dacen23738@lutota.com",
      orderHistory,
      subject: "Sky High Order History for Dacen Jones",
      name: "Dacen Jones",
      text: "Here is your order history",
      bookingDate: "October 12, 2022.",
      idNumber: "123456789",
      currentDate: "September 30, 2022.",
      subtotal: 100,
      fee: 10,
      tax: 10,
      total: 120,
    })
      .then((result) => console.log(result.data))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        <div className="row my-3 align-items-end">
          <div className="col-12 col-lg-2 p-0 mb-3 mb-lg-0 order-2 order-lg-1">
            <Link
              to="/booking/step-5"
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

            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              onClick={handleMail}
            >
              Send mail
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step2;
