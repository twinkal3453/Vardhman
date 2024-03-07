import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartList from "../pageComponents/Cart/CartList";
import CartDetail from "../pageComponents/Cart/CartDetail";
import { Icon, MD3Colors } from "react-native-paper";
import { Pressable } from "react-native";
import LanguageContext from "../context/Language/LanguageContext";

const Stack = createNativeStackNavigator();

const Cart = () => {
  const { handleLanguage } = useContext(LanguageContext);

  return (
    <Stack.Navigator initialRouteName="Cart List">
      <Stack.Screen
        name="Cart List"
        component={CartList}
        options={{
          headerRight: () => (
            <Pressable onPress={handleLanguage}>
              <Icon source="translate" color={MD3Colors.black} size={25} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="Cart Detail" component={CartDetail} />
    </Stack.Navigator>
  );
};

export default Cart;
