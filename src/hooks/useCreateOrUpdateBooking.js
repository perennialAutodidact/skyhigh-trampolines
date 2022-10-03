import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, updateBooking } from "../redux/bookingsSlice";
import {
  getBookedRooms,
  getSelectedAddOns,
  toMoney,
} from "../components/BookingWizard/context/utils";

export const useCreateOrUpdateBooking = (formData) => {
  const appDispatch = useDispatch();
  const { bookingInProgress } = useSelector((state) => state.bookings);

  const bookingData = useMemo(
    () => ({
      date: formData.date,
      rooms: getBookedRooms(formData.rooms).map((room) => ({
        id: room.id,
        products: room.products.map((product) => ({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          duration: product.duration,
        })),
      })),
      addOns: getSelectedAddOns(formData.addOns).map((addOn) => ({
        id: addOn.id,
        name: addOn.name,
        quantity: addOn.quantity,
      })),
      customer: {
        name: formData.fullName,
        email: formData.email,
        address: formData.address,
      },
      confirmation: "pending",
      waiverSignature: formData.signatureImageData,
      total: toMoney(formData.grandTotal) * 100,
    }),
    [formData]
  );

  useEffect(() => {
    if (!bookingInProgress) {
      appDispatch(createBooking(bookingData));
    } else {
      appDispatch(updateBooking(bookingInProgress.id, bookingData));
    }
  }, [bookingInProgress, bookingData, appDispatch]);

  return { bookingInProgress };
};
