import { StyleSheet, Text, View } from "react-native";
import React from "react";

const UserDetail = ({ route }) => {
  const { data } = route.params;
  return (
    <View style={styles.main_detail}>
      <Text>This is {data.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main_detail: {
    padding: 2,
  },
});

export default UserDetail;
