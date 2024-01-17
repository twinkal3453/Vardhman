import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ProductsCard from "../../component/ProductsCard";

const proDetail = [
  {
    name: "Pulse",
    email: "twinkal@gmail.com",
    phone: 76673736660,
  },
  {
    name: "Wheat",
    email: "nikhil@gmail.com",
    phone: 2342342344,
  },
];

const HomeList = ({ navigation }) => {
  return (
    <View style={styles.main_component}>
      <FlatList
        data={proDetail}
        renderItem={({ item }) => <ProductsCard item={item} />}
        keyExtractor={(item) => item.phone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main_component: {
    padding: 2,
  },
});

export default HomeList;
