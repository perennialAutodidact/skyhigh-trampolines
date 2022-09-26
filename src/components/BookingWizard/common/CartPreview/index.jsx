import React, { useContext } from "react";
import { BookingWizardContext } from "../../context";
import { getBookedRooms } from "./utils";
import BookedRooms from "./BookedRooms";
import TotalPriceDisplay from "./TotalPriceDisplay";
import DateDisplay from "./DateDisplay";

const CartPreview = () => {
  const [state] = useContext(BookingWizardContext);
  const { currentStep, formData } = state;
  const { date, rooms } = formData;

  const bookedRooms = getBookedRooms(rooms);

  return (
    <div className="container mt-3 py-3 border border-grey rounded">
      <h3>Cart</h3>
      <div className="row gy-4">
        <div className="col-12">
          <DateDisplay date={date} />
        </div>

        {currentStep > 2 && (
          <>
            <div className="col-12 mb-">
              <BookedRooms rooms={bookedRooms} />
            </div>
            <div className="col-12">
              <TotalPriceDisplay rooms={bookedRooms} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPreview;
