import React from "react";
import { getBookedRooms } from "./utils";

const BookedRooms = ({ rooms }) => {

  const bookedRooms = getBookedRooms(rooms)
  
  return (
    <div className="container p-0">
      {bookedRooms.map((room) => (
        <div key={room.id}>
          <h5 className="fw-bold">{room.name}</h5>
          <div className="row gy-1">
            <div className="col-12">
              <div className="badge bg-info text-dark" title="Start Time">
                {room.selectedStartTime}
              </div>
            </div>

            {room.products.map((product) => (
              <div
                className="col-12 d-flex justify-content-between"
                key={product.id}
              >
                <span>
                  {product.quantity} x {product.name}
                </span>
                <span>
                  ${product.totalPrice / 100}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookedRooms;
