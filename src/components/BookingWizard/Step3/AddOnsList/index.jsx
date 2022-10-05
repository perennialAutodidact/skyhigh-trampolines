import React from "react";
import AddOnsListItem from "./AddOnsListItem";

const AddOnsList = ({ addOns }) => {
  return (
    <div className="row g-0">
      {addOns.map((addOn) => (
        <AddOnsListItem addOn={addOn} key={addOn.id} />
      ))}
    </div>
  );
};

export default AddOnsList;
