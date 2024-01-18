import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import UsersCard from "../../component/UsersCard";

const userData = [
  {
    name: "Twinkal Raj",
    email: "twinkal@gmail.com",
    phone: 76673736660,
  },
  {
    name: "Nikhil Patil",
    email: "nikhil@gmail.com",
    phone: 2342342344,
  },
  {
    name: "Hiren Popat",
    email: "popat@gmail.com",
    phone: 3030303030,
  },
  {
    name: "Sayeem Shaikh",
    email: "sayeem@gmail.com",
    phone: 2324234243,
  },
  {
    name: "Rutvik Barot",
    email: "rutvik@gmail.com",
    phone: 3838383838,
  },
  {
    name: "Radhika Vyas",
    email: "Radhika@gmail.com",
    phone: 2323232323,
  },
  {
    name: "Sneha Jatakiya",
    email: "sneha@gmail.com",
    phone: 23278782323,
  },
  {
    name: "Keyur Sapariya",
    email: "keyur@gmail.com",
    phone: 5445454545,
  },
  {
    name: "Devang Solanki",
    email: "devang@gmail.com",
    phone: 9090909090,
  },
  {
    name: "Deep Mashru",
    email: "deep@gmail.com",
    phone: 4738383938,
  },
  {
    name: "Prabhjyot Saini",
    email: "Prabhjyot@gmail.com",
    phone: 8848374833,
  },
];

const UserList = () => {
  return (
    <View style={styles.main_component}>
      <FlatList
        data={userData}
        renderItem={({ item }) => <UsersCard item={item} />}
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

export default UserList;
