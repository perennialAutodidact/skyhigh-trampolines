import React from "react";
import { Link } from "react-router-dom";
const FormNavButtons = ({ backHref, submitButtonText }) => {
  return (
    <div className="row my-3 d-flex justify-content-center">
      <div className="col-12 col-lg-5 p-0 mb-lg-0 order-2 order-lg-1">
        <Link to={backHref} className="link-dark text-decoration-none">
          <button className="btn btn-outline-dark w-100">Back</button>
        </Link>
      </div>
      <div className="col-12 col-lg-5 offset-lg-1 mb-2 p-0 order-1 order-lg-2">
        <button type="submit" className="btn btn-success w-100">
          {submitButtonText}
        </button>
      </div>
    </div>
  );
};

export default FormNavButtons;
