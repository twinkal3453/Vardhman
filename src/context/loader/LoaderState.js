import { Text, View } from "react-native";
import LoaderContext from "./LoaderContext";
import React, { useState } from "react";

const LoaderState = (props) => {
  const [loader, setLoader] = useState(false);

  const handleLoader = (data) => {
    setLoader(data);
  };

  return (
    <LoaderContext.Provider value={{ loader, handleLoader }}>
      {props.children}
    </LoaderContext.Provider>
  );
};

export default LoaderState;
