import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomList } from "../../../redux/roomsSlice";
import styles from "../BookingWizard.module.scss";
import ProductList from "./ProductList";
import StartTimeList from "./StartTimeList";

const RoomAccordion = ({ roomData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => setIsExpanded((isExpanded) => !isExpanded);

  return (
    <div className="accordion accordion-flush" id="rooms-accordion">
      <div className="accordion-item mb-2">
        <h2
          className="accordion-header shadow border-0"
          id={`accordion-header-${roomData.id}`}
        >
          <div className="container-fluid p-0">
            <button
              className="accordion-button ps-0 py-0 row g-0 gap-2"
              type="button"
              onClick={toggleIsExpanded}
              data-bs-toggle="collapse"
              data-bs-target={`#accordion-collapse-${roomData.id}`}
              aria-expanded={isExpanded}
              aria-controls={`accordion-collapse-${roomData.id}`}
            >
              <div className="col-4 col-lg-3">
                <img
                  src={roomData.photo}
                  alt={roomData.name + " Photo"}
                  className={`${styles.accordionHeaderImage}`}
                />
              </div>

              <div className="col-6 col-lg-7">
                <h4 className="m-0">{roomData.name}</h4>
              </div>
            </button>
          </div>
        </h2>
        <div
          id={`accordion-collapse-${roomData.id}`}
          className="accordion-collapse collapse show"
          aria-labelledby={`accordion-header-${roomData.id}`}
        >
          <StartTimeList />
          <div className="accordion-body container-fluid px-3">
            <ProductList products={roomData.products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAccordion;
