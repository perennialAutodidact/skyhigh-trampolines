import React from "react";
import styles from "./NumberCircle.module.scss";

const NumberCircle = ({ number }) => {
  return (
    <div
      id={`number-circle`}
      className={`
        bg-info text-light rounded-circle 
        d-flex justify-content-center align-items-center 
        fs-2 fw-bold pb-1 shadow
        ${styles.numberCircle}
      `}
      style={{ visibility: "hidden" }}
    >
      {number}
    </div>
  );
};

export default NumberCircle;
