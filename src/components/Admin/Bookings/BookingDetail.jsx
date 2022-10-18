import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookingById } from "../../../redux/bookingsSlice";
import style from "./BookingDetail.module.scss";
import { toMoney } from "../../BookingWizard/context/utils";
const BookingDetail = () => {
  let { id } = useParams();

  const appDispatch = useDispatch();
  let { booking } = useSelector((appState) => appState.bookings);

  useEffect(() => {
    if (id && booking.id !== id) {
      appDispatch(getBookingById(id));
    }
  }, [id, booking, appDispatch]);

  const totalPrice = useMemo(() => {
    let price =
      booking.rooms?.reduce((acc, room) => {
        return (
          acc +
          room.products.reduce((ac, product) => ac + product.totalPrice, 0)
        );
      }, 0) || 0;

    if (booking.addOns) {
      price += booking.addOns.reduce((ac, addOn) => ac + addOn.totalPrice, 0);
    }

    return price;
  }, [booking.rooms, booking.addOns]);

  if (!booking.id) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <h1>Booking detail</h1>
      <div className={style.confirmId}>
        Confirmation # {booking.receiptId.split("-")[0]}
      </div>
      <div className={style.orderDetails}>Order Details</div>
      <div>Booking Date: {booking.date}</div>
      <div className={style.productList}>
        <div className="row">
          <div className="col">
            <div className={style.product}>
              <p>Product</p>
            </div>
          </div>
          <div className="col">
            <p>Qty</p>
          </div>
          <div className="col">
            <p>Booking time</p>
          </div>
          <div className={`col ${style["text-right"]}`}>
            <p>Price</p>
          </div>
        </div>
        {booking.rooms.map((room) => {
          return room.products.map((product) => {
            return (
              <div className={style.productId} key={product.id}>
                <div className="row">
                  <div className="col">
                    {room.name}: {product.name}
                  </div>
                  <div className="col">{product.quantity}</div>
                  <div className="col">{product.duration}</div>
                  <div className={`col ${style["text-right"]}`}>
                    {toMoney(product.totalPrice)}
                  </div>
                </div>
              </div>
            );
          });
        })}

        {booking.addOns?.map((addOn) => {
          return (
            <div className="row" key={addOn.id}>
              <div className="col">{addOn.name}</div>
              <div className="col">{addOn.quantity}</div>
              <div className="col">-</div>
              <div className={`col ${style["text-right"]}`}>
                {toMoney(addOn.totalPrice)}
              </div>
            </div>
          );
        })}

        <div>
          <hr />
        </div>
        <div className={style.totalPrice}>
          <div className="row">
            <div className="col">Total</div>
            <div className={`col ${style["text-right"]}`}>
              {toMoney(totalPrice)}
            </div>
          </div>
        </div>
      </div>

      <h4>Customer Information</h4>
      <div>Full name: {booking.customer.fullName}</div>
      <div>Email: {booking.customer.email}</div>
      <div>Address: {booking.customer.address}</div>
      <div>Mobile Number: {booking.customer.phone}</div>

      <h4>Waiver Details</h4>
      <p className={style.sign}>
        <strong>Signed:</strong> {booking.waiverId ? "Yes" : "No"}
      </p>
      {booking.signature && (
        <img
          className={style.signature}
          src={booking.signature}
          alt="signature"
          width="500"
        />
      )}
    </div>
  );
};

export default BookingDetail;
