import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartList from "../pageComponents/Cart/CartList";
import CartDetail from "../pageComponents/Cart/CartDetail";

const Stack = createNativeStackNavigator();

const Cart = () => {
  return (
    <Stack.Navigator initialRouteName="Cart List">
      <Stack.Screen name="Cart List" component={CartList} />
      <Stack.Screen name="Cart Detail" component={CartDetail} />
    </Stack.Navigator>
  );
};

export default Cart;
