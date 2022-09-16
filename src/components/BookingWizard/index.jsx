import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookingWizardContext, initialState } from "./context";
import { wizardReducer } from "./context/reducer";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Checkout from "./Checkout";
import CartPreview from "./CartPreview";
const BookingWizard = () => {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  return (
    <BookingWizardContext.Provider value={[state, dispatch]}>
      <Router>
        <Routes>
          <Route exact path="/booking" element={<Step1/>}/>
          <Route path="/booking/step-2" element={<Step2/>} />
          <Route path="/booking/step-3" element={<Step3/>} />
          <Route path="/booking/step-4" element={<Step4/>} />
          <Route path="/booking/step-5" element={<Step5/>} />
          <Route path="/booking/step-6" element={<Step6/>} />
          <Route path="/booking/checkout" element={<Checkout/>} />
        </Routes>
      </Router>
      <CartPreview />
    </BookingWizardContext.Provider>
  );
};

export default BookingWizard;
