import ProductContext from "./ProductContext";
import React, { useState } from "react";

const ProductState = (props) => {
  const [prodUpdate, setProdUpdate] = useState(0);

  const handleProdUpdate = (data) => {
    setProdUpdate(data);
  };

  return (
    <ProductContext.Provider value={{ prodUpdate, handleProdUpdate }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
