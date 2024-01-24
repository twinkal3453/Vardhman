import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

const HomeDetail = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={styles.detail_component}>
      <Text>{data.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detail_component: {
    padding: 10,
  },
});

export default HomeDetail;
