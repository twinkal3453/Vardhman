import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../../backend";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
  RefreshControl,
} from "react-native";
import { Avatar, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import formatDate from "../../Helper/utility";
import { Chip } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="progress-clock" />;

const OrderCardAdmin = ({ item }) => {
  const navigation = useNavigation();

  const handleOrderDetai = (data) => {
    navigation.navigate("Order Detail", {
      data: data.orderList,
      orderId: data.id,
      orderStatus: data.status,
    });
  };

  return (
    <SafeAreaView>
      <Card onPress={() => handleOrderDetai(item)} style={styles.list_card}>
        <Card.Title
          title={`${item.customer_name}`}
          titleVariant="titleLarge"
          subtitle={`Rs: ${item.total_amount}`}
          subtitleVariant="titleMedium"
          left={LeftContent}
        />
        <Card.Content>
          <View style={{ width: 150, marginBottom: 5 }}>
            <Chip
              selectedColor={item.status === "Pending" ? "red" : "green"}
              mode="outlined"
              icon={item.status === "Pending" ? "clock-alert-outline" : "check"}
            >
              {item.status}
            </Chip>
          </View>
          <Text
            style={{ marginBottom: 5, fontSize: 17, fontWeight: "500" }}
            variant="titleLarge"
          >{`Order Id: ${item.id}`}</Text>
          <Text variant="titleLarge">{`Date: ${formatDate(
            item.created_at
          )}`}</Text>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

const OrderList = () => {
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
            console.log("Line 70", response.data);
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
          renderItem={({ item }) => <OrderCardAdmin item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  order_component: {
    padding: 2,
    height: "100%",
  },
  list_card: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8,
    margin: 5,

    // Android
    elevation: 5,

    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default OrderList;
