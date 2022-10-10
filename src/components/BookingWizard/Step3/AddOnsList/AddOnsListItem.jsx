import React, { useContext } from "react";
import { BookingWizardContext } from "../../context";
import { setAddOnQuantity } from "../../context/actions";
import { BsPlusLg, BsDashLg } from "react-icons/bs";

const AddOnListItem = ({ addOn }) => {
  // eslint-disable-next-line
  const [_, dispatch] = useContext(BookingWizardContext);

  const onChange = (e) => {
    dispatch(setAddOnQuantity(addOn.id, e.target.value));
  };

  const incrementQuantity = () => {
    const quantity = parseInt(addOn.quantity);

    dispatch(setAddOnQuantity(addOn.id, quantity + 1));
  };

  const decrementQuantity = (addOn) => {
    const quantity = parseInt(addOn.quantity);
    if (quantity > 0) {
      dispatch(setAddOnQuantity(addOn.id, quantity - 1));
    }
  };

  return (
    <div className="row g-0 gy-1">
      <div className="col-5 col-lg-4 offset-lg-2">{addOn.name}</div>
      <div className="col-4 col-lg-2 text-center text-lg-start">
        ${addOn.price / 100}
      </div>
      <div className="col-3 col-lg-2">
        <div className="input-group input-group-sm mb-3 d-flex">
          <div
            onClick={() => decrementQuantity(addOn)}
            className="btn btn-outline-secondary d-flex justify-content-center align-items-center p-1"
          >
            <BsDashLg />
          </div>

          <input
            type="text"
            className="form-control p-0 text-center"
            aria-label={addOn.name}
            value={addOn.quantity}
            onChange={onChange}
          />
          <div
            onClick={() => incrementQuantity(addOn)}
            className="btn btn-outline-secondary d-flex justify-content-center align-items-center p-1"
          >
            <BsPlusLg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnListItem;
