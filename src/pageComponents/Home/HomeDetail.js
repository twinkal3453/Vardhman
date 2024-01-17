import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeDetail = () => {
  return (
    <View style={styles.detail_component}>
      <Text>HomeDetail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detail_component: {
    padding: 10,
  },
});

export default HomeDetail;
