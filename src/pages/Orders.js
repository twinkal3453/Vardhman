import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Orders = () => {
  return (
    <View style={styles.ordera_container}>
      <Text>This is Orders!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ordera_container: {
    padding: 10,
  },
});

export default Orders;
