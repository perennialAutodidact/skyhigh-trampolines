import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getFirstBookingPage,
  getPrevBookingPage,
  getNextBookingPage,
} from "../../../redux/bookingsSlice";
import { getTotalHeadCount } from "../../BookingWizard/context/utils";
import LoadingSpinner from "../../LoadingSpinner";
import { useCallback } from "react";
import { formatReceiptId } from "../../../utils";

const headerNames = [
  "Booking Date",
  "Receipt #",
  "Start Time / Room Name",
  "Head Count",
  "Total",
  "Customer Name",
  "Customer Email",
];
const BookingsList = () => {
  const appDispatch = useDispatch();
  let {
    bookingsPage,
    loading: bookingsLoadingStatus,
    page,
    isLastPage,
  } = useSelector((appState) => appState.bookings);

  const nextPage = () => {
    appDispatch(getNextBookingPage());
  };

  const prevPage = useCallback(() => {
    if (page > 1) {
      appDispatch(getPrevBookingPage());
    }
  }, [page, appDispatch]);

  useEffect(() => {
    if (!bookingsPage && bookingsLoadingStatus !== "pending") {
      appDispatch(getFirstBookingPage());
    }
  }, [bookingsPage, bookingsLoadingStatus, appDispatch]);

  if (!bookingsPage || bookingsLoadingStatus === "pending") {
    return (
      <div className="my-5">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-dark"
              onClick={() => prevPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => nextPage(page + 1)}
              disabled={isLastPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="table-responsive">
          <table className="table mt-4">
            <thead>
              <tr>
                {headerNames.map((headerName) => (
                  <th>{headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookingsPage.length === 0 ? (
                <div className="my-5">
                  <h4>No bookings</h4>
                </div>
              ) : (
                bookingsPage.map((booking) => (
                  <tr>
                    <td>{booking.date}</td>
                    <td>
                      {booking.receiptId ? (
                        <Link
                          to={`/admin/bookings/${booking.id}`}
                          className="link-dark"
                        >
                          {formatReceiptId(booking.receiptId)}
                        </Link>
                      ) : (
                        <span className="text-muted">{booking.status}</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-2">
                        {booking.rooms.map((room) => (
                          <div className="d-flex gap-2 align-items-start align-items-lg-center">
                            <div className="badge bg-info">
                              {room.startTime}
                            </div>
                            <div>{room.name}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>{getTotalHeadCount(booking.rooms)}</td>
                    <td>
                      {booking.grandTotal
                        ? `$${(booking.grandTotal / 100).toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td>{booking.customer?.fullName || "N/A"}</td>
                    <td>{booking.customer?.email || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default BookingsList;
