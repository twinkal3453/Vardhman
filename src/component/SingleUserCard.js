import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SingleUserCard = ({ item }) => {
  console.log("Line 5", item);
  return (
    <View style={styles.list_card}>
      <View style={styles.img_section}>
        <Text>img</Text>
      </View>
      <View style={styles.content_section}>
        <Text>
          <Text style={styles.content}>Name:</Text> {item.name}
        </Text>
        <Text>
          <Text style={styles.content}>Email:</Text> {item.email}
        </Text>
        <Text>
          <Text style={styles.content}>Phone:</Text> {item.phone}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list_card: {},
});

export default SingleUserCard;
