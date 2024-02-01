import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../../backend";
import axios from "axios";
import OrderCard from "../../component/OrderCard";

const OrdersList = () => {
  const [orderData, setOrderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetOrder = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      const user = JSON.parse(userData);
      axios
        .get(`${API()}/get_list_of_orders/${user.userData.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setOrderData(response.data);
            setRefreshing(false);
          }
        })
        .catch((error) => {
          console.log("Line: 24", error);
        });
    } catch (e) {
      // remove error
    }
  };

  //Function will excute when user pull down the screen to refresh the data.
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleGetOrder();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetOrder();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe_view}>
      <View style={styles.order_component}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={orderData && orderData.data}
          renderItem={({ item }) => <OrderCard item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  order_component: {
    padding: 2,
    height: "100%",
  },
});
