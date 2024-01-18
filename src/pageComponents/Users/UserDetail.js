import { StyleSheet, Text, View } from "react-native";
import React from "react";

const UserDetail = () => {
  return (
    <View style={styles.main_detail}>
      <Text>This is Twinkal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main_detail: {
    padding: 2,
  },
});

export default UserDetail;
