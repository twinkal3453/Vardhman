import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import ParentStackNavigator from "./src/ParentStackNavigator";
import AuthenticateState from "./src/context/auth/AuthenticateState";
import LoaderState from "./src/context/loader/LoaderState";
import ProductState from "./src/context/product/ProductState";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "green",
    secondary: "yellow",
    warning: "orange",
    error: "red",
  },
};

export default function App() {
  return (
    <AuthenticateState>
      <LoaderState>
        <ProductState>
          <PaperProvider theme={theme}>
            <ParentStackNavigator />
          </PaperProvider>
        </ProductState>
      </LoaderState>
    </AuthenticateState>
  );
}
