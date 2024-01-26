import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

const CartList = () => {
  useFocusEffect(
    React.useCallback(() => {
      console.log("Line 69 Hello Cart");
    }, [])
  );

  return (
    <View style={styles.cart_component}>
      <Text>CartList Twinkal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cart_component: {
    padding: 2,
  },
});

export default CartList;
