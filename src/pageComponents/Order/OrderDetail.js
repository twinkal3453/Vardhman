import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { IMG, API } from "../../../backend";
import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ item, handlePressed }) => {
  return (
    <SafeAreaView>
      <Pressable onPress={() => handlePressed(item)}>
        <View
          style={{
            backgroundColor: item.status === "1" ? "#e3ffe3" : "#ffe6e6",
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

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: item.status === "1" ? "green" : "#ffabab",
          }}
        >
          <View style={styles.img_section}>
            <Image
              style={styles.prodImage}
              source={{
                uri: `${IMG()}${item.product_image}`,
              }}
            />
          </View>
          <View style={styles.content_section}>
            <Text numberOfLines={3} style={styles.textName}>
              {item.product}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text>
                  <Text style={styles.content}>Price:</Text> {item.amount}
                </Text>
                <Text>
                  <Text style={styles.content}>Qty:</Text> {item.qty}
                </Text>
              </View>
              <Checkbox
                status={item.status === "1" ? "checked" : "unchecked"}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const OrderDetail = ({ route }) => {
  const { data } = route.params;
  const [orderListData, setOrderListData] = useState([]);

  useEffect(() => {
    setOrderListData(data);
  }, [data]);

  console.log("Line 12>>> order", orderListData);

  const handlePressed = (data) => {
    const stateValue = [...orderListData];

    if (data.status === "0") {
      data.status = "1";
    } else {
      data.status = "0";
    }

    for (let i in stateValue) {
      if (stateValue[i].id === data.id) {
        stateValue.splice(i, 1, data);
      }
    }

    setOrderListData(stateValue);
  };

  const handleConfirm = async () => {
    const confirmedParams = [];

    for (let i in orderListData) {
      if (orderListData[i].status === "1") {
        confirmedParams.push(orderListData[i].id);
      }
    }

    const finalParams = {
      orderList: confirmedParams,
    };

    console.log("Line 112 confirmed", finalParams);

    // try {
    //   const userData = JSON.parse(await AsyncStorage.getItem("user"));
    //   const user = JSON.parse(userData);
    //   axios
    //     .post(`${API()}/update_orders/${user.userData.id}`, finalParams, {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //     })
    //     .then((response) => {
    //       if (response.status === 200) {
    //         setOrderData(response.data);
    //         setRefreshing(false);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Line: 24", error);
    //     });
    // } catch (e) {
    //   // remove error
    // }
  };

  return (
    <View style={styles.detail_component}>
      <FlatList
        data={orderListData}
        renderItem={({ item }) => (
          <Item handlePressed={handlePressed} item={item} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Pressable onPress={handleConfirm} style={styles.order_confirm}>
        <Text style={styles.order_confirm_text}>Confirm</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  detail_component: {
    flex: 1,
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

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  img_section: {
    flex: 1,
    marginRight: 10,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4d4d4",
    borderRadius: 3,
  },
  prodImage: {
    width: 50,
    height: 50,
  },
  content_section: {
    flex: 4,
    width: "80%",
  },
  textName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  content: {
    fontWeight: "600",
  },
  order_confirm: {
    backgroundColor: "green",
    padding: 12,
    marginHorizontal: 4,
    marginVertical: 5,
    borderRadius: 8,
  },
  order_confirm_text: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});

export default OrderDetail;
