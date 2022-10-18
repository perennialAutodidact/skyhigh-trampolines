import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookingById } from "../../../redux/bookingsSlice";
import { getOrderSubtotal, toMoney } from "../../BookingWizard/context/utils";
import LoadingSpinner from "../../LoadingSpinner";
import { formatReceiptId } from "../../../utils";
import { BsCalendarCheck, BsClock } from "react-icons/bs";
import _ from "lodash";

const BookingDetail = () => {
  let { id } = useParams();

  const appDispatch = useDispatch();
  let { booking, loading: bookingLoadingStatus } = useSelector(
    (appState) => appState.bookings
  );

  useEffect(() => {
    if (!booking && bookingLoadingStatus !== "pending") {
      appDispatch(getBookingById(id));
    }
  }, [booking, id, appDispatch]);

  const totalPrice = useMemo(
    () => booking && getOrderSubtotal(booking.rooms, booking.addOns),
    [booking]
  );

  if (bookingLoadingStatus === "pending") {
    return (
      <div className="mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  return booking !== null ? (
    <div className="container-fluid mb-5">
      <Link to="/admin" className="link-dark text-decoration-none">
        Back
      </Link>
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3">
          <h3 className="fw-bold order-details pt-3">Order Details</h3>
          <div className="border-top pt-3">
            <div className="d-flex align-items-center gap-2">
              {" "}
              <BsCalendarCheck /> {booking.date}
            </div>
            <div className="p-0 mb-4">
              Confirmation #{" "}
              <span className="fw-bold">
                {formatReceiptId(booking.receiptId)}
              </span>
            </div>

            <div className="row border-bottom mb-3">
              <div className="col-6">Product</div>
              <div className="col-3 text-center">Qty</div>
              <div className="col-3 text-center">Price</div>
            </div>

            {booking.rooms.map((room) => {
              return (
                <div className="row" key={room.id}>
                  <div className="col-12">
                    <h4 className="m-0 p-0">{room.name}</h4>
                    <div className="d-flex align-items-center gap-2">
                      <BsClock /> {room.startTime}
                    </div>
                    {room.products.map((product) => (
                      <div className="row mt-2">
                        <div className="col-6">{product.name}</div>
                        <div className="col-3 text-center">
                          {product.quantity}
                        </div>
                        <div className="col-3 text-center">
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
            {booking.addOns.map((addOn) => (
              <div className="row" key={addOn.id}>
                <div className="col-6">{addOn.name}</div>
                <div className="col-3 text-center">{addOn.quantity}</div>
                <div className="col-3 text-center">$ {addOn.price / 100}</div>
              </div>
            ))}

            <div className="row mt-3 pt-3 border-top">
              <div className="col-9 text-end fw-bold">Subtotal</div>
              <div className="col-3 text-center">
                ${toMoney((booking.receipt.subTotal / 100) * 100)}
              </div>
            </div>
            <div className="row">
              <div className="col-9 text-end fw-bold">Transaction Fee</div>
              <div className="col-3 text-center">
                ${toMoney((booking.receipt.transactionFee / 100) * 100)}
              </div>
            </div>
            <div className="row">
              <div className="col-9 text-end fw-bold">Tax</div>
              <div className="col-3 text-center">
                ${toMoney((booking.receipt.tax / 100) * 100)}
              </div>
            </div>
            <div className="row mt-3">
              <h5 className="col-9 text-end fw-bold">Grand Total</h5>
              <div className="col-3 text-center">
                ${toMoney((booking.receipt.grandTotal / 100) * 100)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 col-lg-6 offset-lg-3">
          <h4>Customer Information</h4>
          <div className="row mt-2 gy-2">
            <div className="col-12">
              <h6 className="m-0">Name</h6>
              <div>{booking.customer.fullName}</div>
            </div>
            <div className="col-12">
              <h6 className="m-0">Email</h6>
              <div>{booking.customer.email}</div>
            </div>
            <div className="col-12">
              <h6 className="m-0">Address</h6>
              <div>{booking.customer.address}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12 col-lg-6 offset-lg-3">
          <h5>Waiver Signature</h5>
          {booking.signature ? (
            <img
              className="border border-2 border-dotted"
              src={booking.signature}
              alt="signature"
              width="100%"
            />
          ) : (
            "The waiver has not been signed."
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="my-5">
      <div className="text-center">{`No booking found with id ${id}`}</div>
    </div>
  );
};

export default BookingDetail;
