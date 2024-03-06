import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import ParentStackNavigator from "./src/ParentStackNavigator";
import AuthenticateState from "./src/context/auth/AuthenticateState";
import LoaderState from "./src/context/loader/LoaderState";
import ProductState from "./src/context/product/ProductState";
import { RootSiblingParent } from "react-native-root-siblings";
import LanguageState from "./src/context/Language/LanguageState";

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
      <LanguageState>
        <RootSiblingParent>
          <LoaderState>
            <ProductState>
              <PaperProvider theme={theme}>
                <ParentStackNavigator />
              </PaperProvider>
            </ProductState>
          </LoaderState>
        </RootSiblingParent>
      </LanguageState>
    </AuthenticateState>
  );
}
