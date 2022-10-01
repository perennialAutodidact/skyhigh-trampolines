import React, { useContext, useMemo, useEffect } from "react";
import { BookingWizardContext } from "../../context";
import { updateGrandTotal } from "../../context/actions";
import { toMoney } from "../../context/utils";
import { getOrderSubtotal } from "./utils";

const TotalPriceDisplay = ({ rooms, addOns }) => {
  const [state, dispatch] = useContext(BookingWizardContext);
  const { SALES_TAX_RATE, TRANSACTION_FEE, grandTotal } = state;
  const subTotal = useMemo(
    () => getOrderSubtotal(rooms, addOns),
    [rooms, addOns]
  );
  const tax = useMemo(
    () => subTotal * SALES_TAX_RATE,
    [subTotal, SALES_TAX_RATE]
  );

  useEffect(() => {
    if (subTotal) {
      dispatch(updateGrandTotal(subTotal + tax + TRANSACTION_FEE));
    }
  }, [dispatch, subTotal, tax, TRANSACTION_FEE]);


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
