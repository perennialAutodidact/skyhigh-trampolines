import React from "react";
import { getOrderSubtotal } from "./utils";

const toMoney = (amount) => (amount.toFixed(0) / 100).toFixed(2);

const TotalPriceDisplay = ({ rooms, addOns }) => {
  const SALES_TAX_RATE = 0.0635;
  const TRANSATION_FEE = 400;

  console.log(addOns);

  const subTotal = getOrderSubtotal(rooms, addOns);

  const tax = subTotal * SALES_TAX_RATE;

  const grandTotal = subTotal + tax + TRANSATION_FEE;

  console.log(grandTotal);

  return (
    <div className="container p-0">
      <h3>Total</h3>
      <div className="row gy-2">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${toMoney(subTotal)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Transaction Fee</span>
            <span>${toMoney(TRANSATION_FEE)}</span>
          </div>
          <div className=" d-flex justify-content-between">
            <span>Tax ({SALES_TAX_RATE * 100}%)</span>
            <span>${toMoney(tax)}</span>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <span className="h6">Total (inc. tax)</span>
            <span className="h6">${toMoney(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPriceDisplay;
