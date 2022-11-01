import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookingById } from "../../../redux/bookingsSlice";
import { toMoney } from "../../BookingWizard/context/utils";
import LoadingSpinner from "../../LoadingSpinner";
import { formatReceiptId } from "../../../utils";
import { BsCalendarCheck, BsClock } from "react-icons/bs";

const BookingDetail = () => {
  let { id } = useParams();

  const appDispatch = useDispatch();
  let { booking, loading: bookingLoadingStatus } = useSelector(
    (appState) => appState.bookings
  );

  const bookingFetched = useRef(false);
  useEffect(() => {
    if (!bookingFetched.current && bookingLoadingStatus !== "pending") {
      bookingFetched.current = true;
      appDispatch(getBookingById(id));
    }
  }, [id, bookingLoadingStatus, appDispatch]);

  if (bookingLoadingStatus === "pending") {
    return (
      <div className="mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  return !booking ? (
    <div className="my-5">
      <div className="text-center">{`No booking found with id ${id}`}</div>
    </div>
  ) : (
    <div className="container-fluid mb-5">
      <Link to="/admin" className="link-dark text-decoration-none">
        Back
      </Link>
      <div className="row bg-white rounded gy-4 mt-3">
        <div className="col-12 col-md-6 offset-md-3">
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
                      <div className="row mt-2" key={product.id}>
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
            <div className="row mt-3 border-bottom">
              <h5 className="col-9 text-end fw-bold">Grand Total</h5>
              <div className="col-3 text-center">
                ${toMoney((booking.receipt.grandTotal / 100) * 100)}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 offset-md-3 pb-5">
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

          <div className="col-12 mt-3">
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
    </div>
  );
};

export default BookingDetail;
