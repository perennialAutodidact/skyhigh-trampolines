import React, { useContext, useEffect } from "react";
import { BookingWizardContext } from "../../context";
import {
  updateSubtotal,
  updateTax,
  updateGrandTotal,
} from "../../context/actions";
import { toMoney, getOrderSubtotal } from "../../context/utils";

const TotalPriceDisplay = ({ rooms, addOns }) => {
  const [state, dispatch] = useContext(BookingWizardContext);
  const {
    formData: { grandTotal, tax, subTotal, SALES_TAX_RATE, TRANSACTION_FEE },
  } = state;

  useEffect(() => {
    const newSubtotal = getOrderSubtotal(rooms, addOns);
    if (subTotal !== newSubtotal) {
      dispatch(updateSubtotal(newSubtotal));
    }
  }, [dispatch, rooms, addOns, subTotal]);

  useEffect(() => {
    dispatch(updateGrandTotal(subTotal + tax + TRANSACTION_FEE));
    dispatch(updateTax(subTotal * SALES_TAX_RATE));
  }, [dispatch, subTotal, tax, TRANSACTION_FEE, SALES_TAX_RATE]);

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
            <span>${toMoney(TRANSACTION_FEE)}</span>
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
