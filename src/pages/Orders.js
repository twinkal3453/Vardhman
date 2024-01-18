import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import OrderList from "../pageComponents/Order/OrderList";
import OrderDetail from "../pageComponents/Order/OrderDetail";

const Stack = createNativeStackNavigator();

const Orders = () => {
  return (
    <Stack.Navigator initialRouteName="Order List">
      <Stack.Screen name="Order List" component={OrderList} />
      <Stack.Screen name="Order Detail" component={OrderDetail} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  ordera_container: {
    padding: 10,
  },
});

export default Orders;
