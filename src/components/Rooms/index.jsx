import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsList } from "../../redux/roomsSlice";
import LoadingSpinner from "../LoadingSpinner";

const RoomsList = () => {
  const appDispatch = useDispatch();
  const { rooms, loading } = useSelector((state) => state.rooms);

  // dispatch action to fetch addOns
  useEffect(() => {
    if (!!rooms && loading === "idle") {
      appDispatch(getRoomsList());
    }
  }, [rooms, loading, appDispatch]);

  if (loading === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <h1>Rooms</h1>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr key={room.id}>
            <th scope="row">
              <div className="d-flex gap-3">
                <figure className="w-25">
                  <img
                    src={room.photo}
                    alt={room.name}
                    className="img-fluid img-thumbnail"
                  />
                </figure>
                <div>
                  <h3>{room.name}</h3>
                  <div className="d-flex gap-2">
                    <h5>Capacity:</h5> {room.capacity}
                  </div>
                </div>
              </div>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomsList;
