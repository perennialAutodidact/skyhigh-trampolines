import React from "react";
import ProductListItem from "./ProductListItem";

const ProductList = ({ products }) => {
  return (
    <div className="row g-0">
      {products.map((product) => (
        <ProductListItem product={product} />
      ))}
    </div>
  );
};

export default ProductList;
