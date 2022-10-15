import React, { useState, useEffect, useMemo, useRef } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { getBookingsByDate } from "../../../redux/bookingsSlice";
import LoadingSpinner from "../../LoadingSpinner";
import { getRoomsList } from "../../../redux/roomsSlice";
import AvailabilityGrid from "./AvailabilityGrid";
import DatePicker from "./DatePicker";
import ColorLegend from "./ColorLegend";

const DailyAvailability = () => {
  const appDispatch = useDispatch();
  const { bookingsByDate, loading: bookingsLoadingStatus } = useSelector(
    (appState) => appState.bookings
  );
  const { rooms, loading: roomsLoadingStatus } = useSelector(
    (appState) => appState.rooms
  );

  const loading = useMemo(
    () => [bookingsLoadingStatus, roomsLoadingStatus].includes("pending"),
    [bookingsLoadingStatus, roomsLoadingStatus]
  );

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const bookings = useMemo(
    () => bookingsByDate[selectedDate],
    [bookingsByDate, selectedDate]
  );

  useEffect(() => {
    if (!!rooms && roomsLoadingStatus === "idle") {
      appDispatch(getRoomsList());
    }
  }, [rooms, roomsLoadingStatus, appDispatch]);

  useEffect(() => {
    if (!bookingsByDate[selectedDate] && bookingsLoadingStatus !== "pending") {
      appDispatch(getBookingsByDate(selectedDate));
    }
  }, [bookingsByDate, bookingsLoadingStatus, selectedDate, appDispatch]);

  return (
    <div className="container pb-5 mb-5">
      <h1 className="text-center">Availability</h1>

      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {loading || !bookings ? (
        <LoadingSpinner />
      ) : (
        <div className="container">
          <div className="row justify-content-center mt-4 gx-5">
            {bookingsByDate[selectedDate].map((room) => (
              <div className="col-12 col-lg-6">
                <h2 className="text-center">{room.name}</h2>
                <p className="text-center">Capacity: {room.capacity}</p>
                <AvailabilityGrid room={room} />
              </div>
            ))}
          </div>
          <ColorLegend />
        </div>
      )}
    </div>
  );
};

export default DailyAvailability;
