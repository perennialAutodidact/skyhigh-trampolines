import React, { useContext } from "react";
import { BookingWizardContext } from "../../context";
import { getBookedRooms, getSelectedAddOns } from "../../context/utils";
import BookedRooms from "./BookedRooms";
import SelectedAddOns from "./SelectedAddOns";
import TotalPriceDisplay from "./TotalPriceDisplay";
import DateDisplay from "./DateDisplay";

const CartPreview = () => {
  const [state] = useContext(BookingWizardContext);
  const { currentStep, formData } = state;
  const { date, rooms, addOns } = formData;

  const bookedRooms = getBookedRooms(rooms);
  const selectedAddOns = getSelectedAddOns(addOns);

  return (
    <div className="container mt-3 py-3 border border-grey rounded">
      <h3>Cart</h3>
      <div className="row gy-4">
        <div className="col-12">
          <DateDisplay date={date} />
        </div>

        {currentStep > 2 && (
          <>
            <div className="col-12 mb-3">
              <BookedRooms rooms={bookedRooms} />
            </div>

            <SelectedAddOns addOns={selectedAddOns} />

            <div className="col-12">
              <TotalPriceDisplay rooms={bookedRooms} addOns={selectedAddOns} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPreview;
