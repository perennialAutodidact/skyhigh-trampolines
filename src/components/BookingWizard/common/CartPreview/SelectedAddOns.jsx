import React from "react";
import { getBookedRooms } from "./utils";

const SelectedAddOns = ({ addOns }) => {
  return (
    <div className="container">
      <h5 className="fw-bold">Add Ons</h5>
      {addOns.map((addOn) => (
        <div key={addOn.id}>
          <div className="row gy-1">
            <div className="col-12 d-flex justify-content-between">
              <span>
                {addOn.quantity} x {addOn.name}
              </span>
              <span>${addOn.totalPrice / 100}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedAddOns;
