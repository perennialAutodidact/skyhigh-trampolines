import React, { useReducer, useEffect, useMemo } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { BookingWizardContext, initialState } from "./context";
import { wizardReducer } from "./context/reducer";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import CartPreview from "./common/CartPreview";
import ProgressBar from "./common/ProgressBar";
import LoadingSpinner from "../LoadingSpinner";
import { useStripeClient } from "../../hooks/useStripeClient";
import ThankYou from "./ThankYou";

const BookingWizard = () => {
  const [wizardState, wizardDispatch] = useReducer(wizardReducer, initialState);
  const location = useLocation();
  const navigate = useNavigate();
  const [stripeClient, stripeLoading] = useStripeClient();

  const currentPath = useMemo(() => location.pathname.split("/"), [location]);
  const isThankYouPage = useMemo(
    () =>
      currentPath.length > 1 &&
      currentPath[currentPath.length - 1] === "thank-you",
    [currentPath]
  );

  const isWaiverPage = useMemo(
    () =>
      currentPath.length > 1 &&
      currentPath[currentPath.length - 1] === "step-5",
    [currentPath]
  );

  //   redirect to step 1 if the page is reloaded and the formData is reset
  useEffect(() => {
    if (
      currentPath.length > 2 &&
      currentPath[currentPath.length - 1] !== "booking" &&
      wizardState.currentStep === 1
    ) {
      navigate("/booking");
    }
  }, [currentPath, wizardState.currentStep, navigate]);

  if (!stripeClient && stripeLoading) {
    return (
      <div className="my-5">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <BookingWizardContext.Provider value={[wizardState, wizardDispatch]}>
      <div className="container">
        {!isThankYouPage && <h1 className="text-center">Booking</h1>}
        {!isThankYouPage && <ProgressBar />}
        <div className="row">
          <div
            className={`col-12 ${
              !isThankYouPage && !isWaiverPage
                ? "col-lg-6 offset-lg-1"
                : "col-lg-8 offset-lg-2 my-5"
            }`}
          >
            <div className="border border-grey rounded mt-3">
              <Routes>
                <Route exact path="/" element={<Step1 />} />
                <Route exact path="/step-2" element={<Step2 />} />
                <Route exact path="/step-3" element={<Step3 />} />
                <Route exact path="/step-4" element={<Step4 />} />
                <Route exact path="/step-5" element={<Step5 />} />
                <Route
                  exact
                  path="/checkout"
                  element={
                    <Step6
                      stripe={stripeClient}
                      stripeLoading={stripeLoading}
                    />
                  }
                />
                <Route exact path="/thank-you" element={<ThankYou />} />
                <Route path="/*" element={<Navigate to="/booking" />} />
              </Routes>
            </div>
          </div>
          {!isThankYouPage && !isWaiverPage ? (
            <div className="d-none d-lg-flex align-items-start flex-column col-lg-4">
              <CartPreview />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </BookingWizardContext.Provider>
  );
};

export default BookingWizard;
