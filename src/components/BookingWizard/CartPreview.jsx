import React, { useContext } from "react";
import { BookingWizardContext } from "./context";
import dayjs from 'dayjs';
import {BsCalendar} from 'react-icons/bs'
const CartPreview = () => {
  const [state] = useContext(BookingWizardContext);
  const {formData} = state 
  const date = dayjs(formData.date).format("MMMM DD, YYYY")

  return (
    <div className="container mt-3 pt-3 border border-grey rounded">
      <h3>Cart</h3>
      <div className="d-flex align-items-center gap-2">

      <BsCalendar/> <span>{date}</span>
      </div>
    
    </div>
  );
};

export default CartPreview;
