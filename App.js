import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import ParentStackNavigator from "./src/ParentStackNavigator";

import AuthenticateState from "./src/context/AuthenticateState";

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
      <PaperProvider theme={theme}>
        <ParentStackNavigator />
      </PaperProvider>
    </AuthenticateState>
  );
}
