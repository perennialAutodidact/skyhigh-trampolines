import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddOnsList } from "../../redux/addOnsSlice";
import LoadingSpinner from "../LoadingSpinner";

const AllAddOns = () => {
  const dispatch = useDispatch();
  const { addOns, loading: addOnsLoadingStatus } = useSelector(
    (state) => state.addOns
  );

  // dispatch action to fetch addOns
  useEffect(() => {
    if (!!addOns && addOnsLoadingStatus === "idle") {
      const promise = dispatch(getAddOnsList());
    }
  }, [addOns, addOnsLoadingStatus, dispatch]);

  const data = addOns?.map((product) => {
    return (
      <tr key={product.id}>
        <th scope="row">
          <div className="d-flex align-items-start gap-3">
            <figure className="w-25">
              <img
                src={product.photo}
                alt={product.name}
                className="img-fluid img-thumbnail"
              />
            </figure>
            {product.name}
          </div>
        </th>

        <td>{product.price / 100}</td>
      </tr>
    );
  });

  if (addOnsLoadingStatus === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Add On</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>{data}</tbody>
    </table>
  );
};

export default AllAddOns;
