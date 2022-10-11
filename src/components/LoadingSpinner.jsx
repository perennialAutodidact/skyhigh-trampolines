import React from "react";

const LoadingSpinner = ({ color = "primary" }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className={`spinner-border text-${color}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
