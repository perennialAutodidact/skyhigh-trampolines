import React, { useState, useRef } from "react";
import styles from "./Accordion.module.scss";
import { useOnLoadImages } from "../../../../hooks/useOnLoadImages";
import LoadingSpinner from "../../../LoadingSpinner";

const AccordionItem = ({ item, headerText, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = () => setIsExpanded((isExpanded) => !isExpanded);

  const imageRef = useRef(null);
  const imageLoaded = useOnLoadImages(imageRef);

  return (
    <div className="accordion-item mb-2" ref={imageRef}>
      <h2
        className="accordion-header shadow border-0"
        id={`accordion-header-${item.id}`}
      >
        <div className="container-fluid p-0">
          <button
            className="accordion-button ps-0 py-0 row g-0 gap-2"
            type="button"
            onClick={toggleIsExpanded}
            data-bs-toggle="collapse"
            data-bs-target={`#accordion-collapse-${item.id}`}
            aria-expanded={isExpanded}
            aria-controls={`accordion-collapse-${item.id}`}
          >
            <div className="col-4 col-lg-3">
              {!imageLoaded ? (
                <LoadingSpinner />
              ) : (
                <img
                  src={item.photo ? item.photo : undefined}
                  alt={item.name + " Photo"}
                  className={`${styles.accordionHeaderImage}`}
                />
              )}
            </div>

            <div className="col-6 col-lg-7">
              <h4 className="m-0">{headerText}</h4>
            </div>
          </button>
        </div>
      </h2>
      {children}
    </div>
  );
};

export default AccordionItem;
