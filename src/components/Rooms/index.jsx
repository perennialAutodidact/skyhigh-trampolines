import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsList } from "../../redux/roomsSlice";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./RoomsList.module.scss";

const RoomsList = () => {
  const appDispatch = useDispatch();
  const { rooms, loading: roomsLoadingStatus } = useSelector(
    (state) => state.rooms
  );

  // dispatch action to fetch addOns
  useEffect(() => {
    if (rooms.length === 0) {
      if (roomsLoadingStatus === "idle") {
        appDispatch(getRoomsList());
      }
    }
  }, [rooms, roomsLoadingStatus, appDispatch]);

  if (roomsLoadingStatus === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center">Rooms</h1>
        <div className="col-12">
          {rooms.length === 0 ? (
            "No rooms found."
          ) : (
            <div className="row border-bottom pt-3 pb-5 d-flex justify-content-center gap-3">
              {rooms.map((room) => (
                <div className="col-12 col-lg-4 p-3 border rounded shadow">
                  <div className="row">
                    <div className="col-4">
                      <img
                        src={room.photo}
                        alt={room.name}
                        className={`img-fluid img-thumbnail ${styles.roomThumbnail}`}
                      />
                    </div>

                    <div className="col-8">
                      <h3>{room.name}</h3>
                      <div className="d-flex gap-2">
                        <h5>Capacity:</h5> {room.capacity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomsList;
