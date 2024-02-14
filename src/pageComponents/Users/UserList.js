import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import UsersCard from "../../component/UsersCard";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../../backend";

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
            data.sort((a, b) => a.id - b.id);
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
    flex: 1,
  },
});

export default UserList;
