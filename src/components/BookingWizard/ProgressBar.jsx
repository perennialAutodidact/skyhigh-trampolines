import React, { useContext, useEffect } from "react";
import { BookingWizardContext } from "./context";
import { setProgressBarStep } from "./context/actions";

const ProgressBar = () => {
  const [state, dispatch] = useContext(BookingWizardContext);
  const { percentComplete, currentStep, totalSteps } = state;

  useEffect(() => {
    dispatch(setProgressBarStep(1));
  }, [dispatch]);

  return (
    <div className="container p-0">
      <div className="row">
        <div className="col-12 col-lg-10 offset-lg-1">
          <p className="m-0">
            Step {currentStep} of {totalSteps}
          </p>
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${percentComplete}%` }}
              role="progressbar"
              aria-valuenow={percentComplete}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Booking Process Progress Bar"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
