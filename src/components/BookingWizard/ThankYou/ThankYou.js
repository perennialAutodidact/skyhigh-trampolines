import React, { useContext } from "react";
import { BookingWizardContext } from "../context";
import styles from "./ThankYou.module.scss";
import { toMoney, getBookedRooms, getSelectedAddOns } from "../context/utils";

const ThankYou = () => {
  const [wizardState] = useContext(BookingWizardContext);
  console.log("state", wizardState);

  const bookedRooms = getBookedRooms(wizardState.rooms);
  const selectedAddOns = getSelectedAddOns(wizardState.addOns);

  return (
    <div className="container pt-5 w-75">
      <p className={styles.bold}>ORDER CONFIRMATION</p>
      <div className="text-center">
        <h3 className="pt-5">Thank You</h3>
        <p>Your order has been received.</p>
      </div>
      <div>
        <p className="pt-3">Hello {wizardState.formData.fullName},</p>
        <p className="pt-3">
          Your booking has been confirmed. We've sent an email to{" "}
          <strong className={styles.bold}>{wizardState.formData.email}</strong>{" "}
          with your order confirmation and receipt.
        </p>
        <br />

        <h3 className="fw-bold order-details">Order Details</h3>

        <p>Confirmation {wizardState.confirmationId}</p>
        <br />

        {bookedRooms.map((room) => {
          return (
            <div key={room.id}>
              <p>{room.name}</p>
              {room.products.map((product) => {
                return (
                  <div className={styles.order} key={product.id}>
                    <div>
                      <p className={styles.product}>{product.name}</p>
                      {room.selectedStartTime && (
                        <p className={styles.bookingTime}>
                          Booking Time {room.selectedStartTime}
                        </p>
                      )}
                    </div>
                    <p className={styles.amount}>X {product.quantity}</p>
                    <p className={styles.price}>$ {product.price / 100}</p>
                  </div>
                );
              })}
              <br />
            </div>
          );
        })}

        {selectedAddOns.map((addOn) => {
          return (
            <div className={styles.order} key={addOn.id}>
              <div>
                <p className={styles.addOn}>{addOn.name}</p>
              </div>
              <p className={styles.amount}>X {addOn.quantity}</p>
              <p className={styles.price}>$ {addOn.price / 100}</p>
            </div>
          );
        })}
        <div className={styles.order}>
          <div>
            <p className={styles.addOn}></p>
          </div>
          <p className={styles.amount}>Subtotal</p>
          <p className={styles.price}>
            ${toMoney(wizardState.formData.subTotal)}
          </p>
        </div>
        <div className={styles.order}>
          <div>
            <p className={styles.addOn}></p>
          </div>
          <p className={styles.amount}>Transaction Fee</p>
          <p className={styles.price}>
            ${toMoney(wizardState.formData.transactionFee)}
          </p>
        </div>
        <div className={styles.order}>
          <div>
            <p className={styles.addOn}></p>
          </div>
          <p className={styles.amount}>Tax</p>
          <p className={styles.price}>${toMoney(wizardState.formData.tax)}</p>
        </div>
        <div className={styles.order}>
          <div>
            <p className={styles.addOn}></p>
          </div>
          <h5 className={styles.amount}>Grand Total</h5>
          <p className={styles.price}>
            ${toMoney(wizardState.formData.grandTotal)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
