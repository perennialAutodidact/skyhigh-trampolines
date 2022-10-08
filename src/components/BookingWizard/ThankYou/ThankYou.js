import React, { useContext } from "react";
import { BookingWizardContext } from "../context";
import styles from "./ThankYou.module.scss";
import { toMoney, getBookedRooms, getSelectedAddOns } from "../context/utils";
import { getOrderSubtotal } from "../common/CartPreview/utils";

const ThankYou = () => {
  const [state] = useContext(BookingWizardContext);

  const bookedRooms = getBookedRooms(state.formData.rooms);
  const selectedAddOns = getSelectedAddOns(state.formData.addOns);

  const subTotal = getOrderSubtotal(bookedRooms, selectedAddOns);

  return (
    <div className="container pt-5 w-75">
      <p className={styles.bold}>ORDER CONFIRMATION</p>
      <div className="text-center">
        <h3 className="pt-5">Thank You</h3>
        <p>Your order has been received.</p>
      </div>
      <div>
        <p className="pt-3">Hello {state.formData.fullName},</p>
        <p className="pt-3">
          Your booking has been confirmed. We've sent an email to{" "}
          <strong className={styles.bold}>{state.formData.email}</strong> with
          your order confirmation and receipt.
        </p>
        <br />

        <h3 className="fw-bold order-details">Order Details</h3>

        <p>Confirmation #{state.confirmationId}</p>
        <br />

        {state.formData.rooms
          .filter((room) => room.selectedStartTime)
          .map((room) => {
            return (
              <div key={room.id}>
                <p>{room.name}</p>
                {room.products
                  .filter((product) => product.quantity > 0)
                  .map((product) => {
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

        {state.formData.addOns
          .filter((addOn) => addOn.quantity > 0)
          .map((addOn) => {
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
          <p className={styles.amount}>Sub Total</p>
          <p className={styles.price}>${toMoney(subTotal)}</p>
        </div>
        <div className={styles.order}>
          <div>
            <p className={styles.addOn}></p>
          </div>
          <p className={styles.amount}>Transaction Fee</p>
          <p className={styles.price}>${toMoney(state.TRANSACTION_FEE)}</p>
        </div>
        <div className={styles.order}>
          <div>
            <p className={styles.addOn}></p>
          </div>
          <p className={styles.amount}>Tax</p>
          <p className={styles.price}>
            ${toMoney(subTotal * state.SALES_TAX_RATE)}
          </p>
        </div>
        <div className={styles.order}>
          <div>
            <p className={styles.addOn}></p>
          </div>
          <h5 className={styles.amount}>Grand Total</h5>
          <p className={styles.price}>${toMoney(state.grandTotal)}</p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
