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
  {
    name: "Flour",
    email: "twin@gmail.com",
    phone: 3849384938,
  },
  {
    name: "Colgate",
    email: "prince@gmail.com",
    phone: 4874847384,
  },
  {
    name: "Bran",
    email: "bran@gmail.com",
    phone: 4749503982,
  },
  {
    name: "Bran",
    email: "bran@gmail.com",
    phone: 9000909090,
  },
  {
    name: "Cashew nut",
    email: "cashew@gmail.com",
    phone: 1212121212,
  },
  {
    name: "Peanut",
    email: "peanut@gmail.com",
    phone: 3847374573,
  },
  {
    name: "Raisin",
    email: "raisin@gmail.com",
    phone: 7438740904,
  },
  {
    name: "Tamrind",
    email: "tamrind@gmail.com",
    phone: 9090909009,
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
