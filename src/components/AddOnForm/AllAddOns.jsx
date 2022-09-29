import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddOns } from "../../redux/addOnsSlice";

const AllAddOns = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.addOns);

  // dispatch action to fetch addOns
  useEffect(() => {
    const promise = dispatch(fetchAddOns());

    // cancel the promise if the component unmounts
    return () => promise.abort();
  }, [dispatch]);

  const data = products?.map((product) => {
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

  return (
    <div>
      {loading === "idle" || loading === "pending" ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      )}
    </div>
  );
};

export default AllAddOns;
