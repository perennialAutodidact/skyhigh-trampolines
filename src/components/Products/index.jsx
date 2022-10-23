import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./ProductList.module.scss";

const ProductData = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoadingStatus } = useSelector(
    (state) => state.products
  );

  // dispatch action to fetch products
  useEffect(() => {
    if (products.length === 0) {
      if (productsLoadingStatus === "idle") {
        dispatch(fetchProducts());
      }
    }
  }, [dispatch, products, productsLoadingStatus]);

  return (
    <>
      {productsLoadingStatus === "pending" ? (
        <LoadingSpinner />
      ) : (
        <div className="container">
          <div className="row">
            <h1 className="text-center">Products</h1>
            <div className="col-12">
              {products.length === 0 ? (
                "No products found."
              ) : (
                <div className="row border-bottom pt-3 pb-5 gap-4 d-flex justify-content-center">
                  {products.map((product) => (
                    <div className="col-12 col-lg-3 p-3 border rounded shadow">
                      <div className="row">
                        <div className="col-4">
                          <img
                            src={product.photo}
                            alt={product.name}
                            className={`img-fluid img-thumbnail ${styles.productThumbnail}`}
                          />
                        </div>

                        <div className="col-8 text-end">
                          <h5 className="m-0 p-0">{product.name}</h5>
                          <div className="fs-5 p-0">${product.price / 100}</div>
                        </div>
                        <div className="col-12 mt-3">
                          <p className="m-0 p-0">{product.room.name}</p>
                          <div className="py-2 m-0">{product.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductData;
