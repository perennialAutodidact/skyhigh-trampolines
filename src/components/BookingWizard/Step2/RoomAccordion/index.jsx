import React, { useState, useContext, useMemo } from "react";
import styles from "./RoomAccordion.module.scss";
import ProductList from "./ProductList";
import StartTimeList from "./StartTimeList";
import { BookingWizardContext } from "../../context";

const RoomAccordion = ({ roomIndex }) => {
  const [state, dispatch] = useContext(BookingWizardContext);
  const { formData: {rooms} } = state;

  const room = useMemo(() => rooms[roomIndex], [rooms, roomIndex]);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => setIsExpanded((isExpanded) => !isExpanded);

  return (
    <div className="accordion accordion-flush" id="rooms-accordion">
      <div className="accordion-item mb-2">
        <h2
          className="accordion-header shadow border-0"
          id={`accordion-header-${room.id}`}
        >
          <div className="container-fluid p-0">
            <button
              className="accordion-button ps-0 py-0 row g-0 gap-2"
              type="button"
              onClick={toggleIsExpanded}
              data-bs-toggle="collapse"
              data-bs-target={`#accordion-collapse-${room.id}`}
              aria-expanded={isExpanded}
              aria-controls={`accordion-collapse-${room.id}`}
            >
              <div className="col-4 col-lg-3">
                <img
                  src={room.photo}
                  alt={room.name + " Photo"}
                  className={`${styles.accordionHeaderImage}`}
                />
              </div>

              <div className="col-6 col-lg-7">
                <h4 className="m-0">{room.name}</h4>
              </div>
            </button>
          </div>
        </h2>
        <div
          id={`accordion-collapse-${room.id}`}
          className="accordion-collapse collapse show"
          aria-labelledby={`accordion-header-${room.id}`}
        >
          <StartTimeList room={room} />
          <div className="accordion-body container-fluid px-3">
            <ProductList products={room.products} roomId={room.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAccordion;
