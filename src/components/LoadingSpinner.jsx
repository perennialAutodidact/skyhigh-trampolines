import React from "react";

const LoadingSpinner = ({ color = "primary", size = null }) => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className={`spinner-border text-${color} ${
          size === "sm" ? "spinner-border-sm my-1" : ""
        }`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
