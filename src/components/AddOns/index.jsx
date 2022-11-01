import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddOnsList } from "../../redux/addOnsSlice";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./AddOnsList.module.scss";

const AllAddOns = () => {
  const dispatch = useDispatch();
  const { addOns, loading: addOnsLoadingStatus } = useSelector(
    (state) => state.addOns
  );

  // dispatch action to fetch addOns
  useEffect(() => {
    if (addOns.length === 0) {
      if (addOnsLoadingStatus === "idle") {
        dispatch(getAddOnsList());
      }
    }
  }, [addOns, addOnsLoadingStatus, dispatch]);

  if (addOnsLoadingStatus === "pending") {
    return <LoadingSpinner />;
  }

  return addOnsLoadingStatus === "pending" ? (
    <LoadingSpinner />
  ) : (
    <div className="container">
      <div className="row">
        <h1 className="text-center">Add-Ons</h1>
        <div className="col-12">
          {addOns.length === 0 ? (
            "No add-ons found."
          ) : (
            <div className="row border-bottom justify-content-center py-3 gap-4">
              {addOns.map((addOn) => (
                <div
                  className="col-12 col-lg-4 p-3 border rounded shadow"
                  key={addOn.id}
                >
                  <div className="row">
                    <div className="col-4">
                      <img
                        src={addOn.photo}
                        alt={addOn.name}
                        className={`img-fluid img-thumbnail ${styles.addOnThumbnail}`}
                      />
                    </div>

                    <div className="col-8 d-flex align-items-center">
                      <div className="row">
                        <div className="my-1 d-flex flex-column flex-lg-row gap-lg-2 align-items-lg-end">
                          <h4 className="m-0 p-0">{addOn.name}</h4>
                        </div>
                        <div className="col-12">
                          <span className="fs-5">${addOn.price / 100}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AllAddOns;
