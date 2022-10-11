import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import LoadingSpinner from "../LoadingSpinner";

const ProductData = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoadingStatus } = useSelector(
    (state) => state.products
  );

  // dispatch action to fetch products
  useEffect(() => {
    if (!!products && productsLoadingStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, products, productsLoadingStatus]);

  // map over products and return a table row for each product
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

        <td>${product.price / 100}</td>
        <td>{product.productType} </td>
      </tr>
    );
  });

  return (
    <>
      {productsLoadingStatus === "idle" ||
      productsLoadingStatus === "pending" ? (
        <LoadingSpinner />
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      )}
    </>
  );
};

export default ProductData;
