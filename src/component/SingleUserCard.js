import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SingleUserCard = ({ item }) => {
  console.log("Line 5", item);
  return (
    <View style={styles.list_card}>
      <Text>Hello single user detail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  list_card: {},
});

export default SingleUserCard;
