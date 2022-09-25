import React from "react";
import ProductListItem from "./ProductListItem";

const ProductList = ({ products, roomId }) => {
  return (
    <div className="row g-0">
      {products.map((product) => (
        <ProductListItem product={product} roomId={roomId} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
