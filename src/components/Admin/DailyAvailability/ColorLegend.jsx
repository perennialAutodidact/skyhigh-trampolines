import React from "react";
import styles from "./DailyAvailability.module.scss";

const ColorLegend = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3">
          <div className="row">
            <div className="col-4 d-flex flex-column align-items-center justify-content-start">
              <div className={`bg-green ${styles.colorLegendSquare}`}></div>
              <div className="text-center">{"<"} 50% Booked</div>
            </div>
            <div className="col-4 d-flex flex-column align-items-center justify-content-start">
              <div className={`bg-yellow ${styles.colorLegendSquare}`}></div>
              <div className="text-center">{">"} 50% Booked</div>
            </div>
            <div className="col-4 d-flex flex-column align-items-center justify-content-start">
              <div className={`bg-red ${styles.colorLegendSquare}`}></div>
              <div className="text-center">100% Booked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorLegend;
