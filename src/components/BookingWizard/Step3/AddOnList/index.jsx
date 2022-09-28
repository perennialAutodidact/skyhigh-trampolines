import React from "react";
import AddOnListItem from "./AddOnListItem";

const AddOnList = ({ addOns }) => {
  return (
    <div className="row g-0">
      {addOns.map((addOn) => (
        <AddOnListItem addOn={addOn} key={addOn.id} />
      ))}
    </div>
  );
};

export default AddOnList;
