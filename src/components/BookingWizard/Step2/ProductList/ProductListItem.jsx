import React, { useContext, useEffect } from "react";
import { BookingWizardContext } from "../../context";
import { setProductQuantity } from "../../context/actions";
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { hasSelectedStartTimeAndProducts } from "components/BookingWizard/context/utils";

const ProductListItem = ({
  product,
  roomId,
  availableQuantity,
  fieldChangeHandler,
}) => {
  const [wizardState, wizardDispatch] = useContext(BookingWizardContext);

  const onChange = (e, max) => {
    let value = e.target.value.replace(/\D/g, "");
    value = Number(value);
    if (isNaN(value)) {
      value = 0;
    } else if (value > max) {
      value = max;
    }

    wizardDispatch(setProductQuantity(roomId, product.id, value));
  };

  const incrementQuantity = (product, max) => {
    const quantity = parseInt(product.quantity);
    if (quantity < max) {
      wizardDispatch(setProductQuantity(roomId, product.id, quantity + 1));
    }
  };

  const decrementQuantity = (product) => {
    const quantity = parseInt(product.quantity);
    if (quantity > 0) {
      wizardDispatch(setProductQuantity(roomId, product.id, quantity - 1));
    }
  };

  useEffect(() => {
    fieldChangeHandler(hasSelectedStartTimeAndProducts(wizardState.rooms));
  }, [fieldChangeHandler, wizardState.rooms]);

  return (
    <div className="row g-0 gy-1">
      <div className="col-5 col-lg-4 offset-lg-2 d-flex flex-column">
        <span>{product.name}</span>
        <span className="text-muted">{availableQuantity} available</span>
      </div>
      <div className="col-4 col-lg-2 text-center text-lg-start">
        ${product.price / 100}
      </div>
      <div className="col-3 col-lg-2">
        <div className="input-group input-group-sm mb-3 d-flex">
          <div
            onClick={() => decrementQuantity(product)}
            className="btn btn-outline-secondary d-flex justify-content-center align-items-center p-1"
          >
            <BsDashLg />
          </div>

          <input
            type="text"
            className="form-control p-0 text-center"
            aria-label={product.name}
            value={product.quantity}
            onChange={(e) => onChange(e, availableQuantity)}
            pattern={"[0-9]+"}
          />
          <div
            onClick={() => incrementQuantity(product, availableQuantity)}
            className="btn btn-outline-secondary d-flex justify-content-center align-items-center p-1"
          >
            <BsPlusLg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
