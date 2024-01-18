import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CartList = () => {
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
