import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import OrderList from "../pageComponents/Order/OrderList";
import OrderDetail from "../pageComponents/Order/OrderDetail";
import { Icon, MD3Colors } from "react-native-paper";
import { Pressable } from "react-native";
import LanguageContext from "../context/Language/LanguageContext";

const Stack = createNativeStackNavigator();

const Orders = () => {
  const { handleLanguage } = useContext(LanguageContext);

  return (
    <Stack.Navigator initialRouteName="Order List">
      <Stack.Screen name="Order List" component={OrderList} />
      <Stack.Screen
        name="Order Detail"
        component={OrderDetail}
        options={{
          headerRight: () => (
            <Pressable onPress={handleLanguage}>
              <Icon source="translate" color={MD3Colors.black} size={25} />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  ordera_container: {
    padding: 10,
  },
});

export default Orders;
