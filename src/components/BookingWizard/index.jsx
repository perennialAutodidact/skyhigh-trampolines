import React, { useReducer, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
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


const BookingWizard = () => {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathChunks = location.pathname.split("/");
    if (pathChunks.length > 2 && state.currentStep === 1) {
      navigate("/booking");
    }

    return () => {
      // cancel payment intent
    }
  }, [location, state.currentStep, navigate]);

  return (
    <BookingWizardContext.Provider value={[state, dispatch]}>
      <div className="container">
        <h1 className="text-center">Booking</h1>
        <ProgressBar />
        <div className="row">
          <div className="col-12 col-lg-6 offset-lg-1">
            <div className="border border-grey rounded mt-3">
              <Routes>
                <Route exact path="/" element={<Step1 />} />
                <Route path="/step-2" element={<Step2 />} />
                <Route path="/step-3" element={<Step3 />} />
                <Route path="/step-4" element={<Step4 />} />
                <Route path="/step-5" element={<Step5 />} />
                <Route path="/checkout" element={<Step6 />} />
                <Route path="/*" element={<Navigate to="/booking" />} />
              </Routes>
            </div>
          </div>
          <div className="d-none d-lg-flex align-items-start col-lg-4">
            <CartPreview />
          </div>
        </div>
      </div>
    </BookingWizardContext.Provider>
  );
};

export default BookingWizard;
