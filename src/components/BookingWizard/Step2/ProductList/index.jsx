import React, { useMemo } from "react";
import ProductListItem from "./ProductListItem";

const ProductList = ({ room }) => {
  const availableProducts = useMemo(
    () =>
      room.products.filter(
        (product) =>
          room.availabilities[room.selectedStartTime][product.duration] > 0
      ),
    [room.availabilities, room.selectedStartTime, room.products]
  );

  return (
    <div className="row g-0">
      {availableProducts.map((product) => (
        <ProductListItem
          product={product}
          roomId={room.id}
          key={product.id}
          availableQuantity={
            room.availabilities[room.selectedStartTime][product.duration]
          }
        />
      ))}
    </div>
  );
};

export default ProductList;
