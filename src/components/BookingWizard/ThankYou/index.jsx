import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookingWizardContext } from "../context";
import styles from "./ThankYou.module.scss";
import { toMoney, getBookedRooms, getSelectedAddOns } from "../context/utils";
import { clearPaymentIntent } from "../../../redux/stripeSlice";

const ThankYou = () => {
  const appDispatch = useDispatch();
  const navigate = useNavigate();
  const { paymentIntent } = useSelector((appState) => appState.stripe);
  const [wizardState] = useContext(BookingWizardContext);

  const bookedRooms = getBookedRooms(wizardState.rooms);
  const selectedAddOns = getSelectedAddOns(wizardState.addOns);

  useEffect(() => {
    if (paymentIntent.id) {
      appDispatch(clearPaymentIntent());
    } else {
      if(wizardState.currentStep === 1){
        navigate("/");
      }
    }
  }, [paymentIntent, appDispatch, navigate, wizardState.currentStep]);

  return (
    <div className="container-fluid pt-3 pb-5">
      <div className="row">
        <div className="col-12 col-lg-10 offset-lg-1">
          <div className="text-center mt-5">
            <h1>Thank You!</h1>
            <h3>Your order has been received.</h3>
          </div>
          <div className="mt-5">
            <div className="pt-3">
              Hello{" "}
              <span className="fw-bold">{wizardState.formData.fullName}</span>,
            </div>
            <div className="pt-3 m-0">
              Your booking has been confirmed. We've sent an email to{" "}
              <strong className="fw-bold">{wizardState.formData.email}</strong>{" "}
              with your order confirmation and receipt.
            </div>
            <br />

            <h3 className="fw-bold order-details border-top pt-3">
              Order Details
            </h3>

            <div className="p-0 mb-4">
              Confirmation #{" "}
              <span className="fw-bold">
                {wizardState.formData.receiptId ? wizardState.formData.receiptId.split("-")[0] : ""}
              </span>
            </div>

            {bookedRooms.map((room) => {
              return (
                <div className="row" key={room.id}>
                  <div className="col-12">
                    <h4 className="m-0 p-0">{room.name}</h4>
                    <div className={styles.bookingTime}>
                      Start Time {room.selectedStartTime}
                    </div>
                    {room.products.map((product) => (
                      <div className="row mt-2">
                        <div className="col-6">{product.name}</div>
                        <div className="col-2 text-end">{product.quantity}</div>
                        <div className="col-4 text-end">
                          $ {product.price / 100}
                        </div>
                      </div>
                    ))}
                  </div>
                  <br />
                </div>
              );
            })}

            <h5 className="m-0 mt-3 p-0">Add-Ons</h5>
            {selectedAddOns.map((addOn) => (
              <div className="row" key={addOn.id}>
                <div className="col-6">{addOn.name}</div>
                <div className="col-2 text-end">{addOn.quantity}</div>
                <div className="col-4 text-end">$ {addOn.price / 100}</div>
              </div>
            ))}

            <div className="row mt-3 pt-3 border-top">
              <div className="col-9 text-end fw-bold">Subtotal</div>
              <div className="col-3 text-end">
                ${toMoney(wizardState.formData.subTotal)}
              </div>
            </div>
            <div className="row">
              <div className="col-9 text-end fw-bold">Transaction Fee</div>
              <div className="col-3 text-end">
                ${toMoney(wizardState.formData.transactionFee)}
              </div>
            </div>
            <div className="row">
              <div className="col-9 text-end fw-bold">Tax</div>
              <div className="col-3 text-end">
                ${toMoney(wizardState.formData.tax)}
              </div>
            </div>
            <div className="row mt-3">
              <h5 className="col-9 text-end fw-bold">Grand Total</h5>
              <div className="col-3 text-end">
                ${toMoney(wizardState.formData.grandTotal)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
