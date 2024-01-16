import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Cart = () => {
  return (
    <View style={styles.cart_container}>
      <Text>This is cart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cart_container: {
    padding: 10,
  },
});

export default Cart;
