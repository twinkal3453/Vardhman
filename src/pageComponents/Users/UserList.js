import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import UsersCard from "../../component/UsersCard";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../../backend";

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
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      // Vibration.vibrate(500);
      const user = JSON.parse(userData);

      // Making the Actual Api Call
      await axios
        .get(`${API()}/fetch_user_data_list/all`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.data;
            setUsers(data);
            setRefreshing(false);
          }
        })
        .catch((error) => {
          console.log("Line 76", error);
        });
    } catch (e) {
      // remove error
      console.log("Line 11 error", e);
    }
  };

  //Function will excute when user pull down the screen to refresh the data.
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUsers();
  }, []);

  // when screen will active then this screen will auto refresh.
  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, [])
  );

  console.log("Line 115 users", users);

  return (
    <View style={styles.main_component}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={users && users}
        renderItem={({ item }) => <UsersCard item={item} />}
        keyExtractor={(item) => item.id}
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
