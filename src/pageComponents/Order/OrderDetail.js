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
import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Button,
  Card,
  ActivityIndicator,
  MD2Colors,
  MD3Colors,
  Icon,
} from "react-native-paper";
import { IMG, API } from "../../../backend";
import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import useToast from "../../customHook/useToast";
import LanguageContext from "../../context/Language/LanguageContext";

const Item = ({ item, handlePressed }) => {
  const { language } = useContext(LanguageContext);

  const handleName = () => {
    const returnName = {
      hindi: item.product_name_hin,
      english: item.product_name_eng,
      gujrati: item.product_name_guj,
    };
    return returnName[language];
  };

  return (
    <SafeAreaView>
      <Pressable onPress={() => handlePressed(item)}>
        <View
          style={{
            backgroundColor: item.status === "Approved" ? "#e3ffe3" : "#ffe6e6",
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
            borderColor: item.status === "Approved" ? "green" : "#ffabab",
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
              {handleName()}
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
              <Icon
                source={item.status === "Approved" ? "check" : "exclamation"}
                color={item.status === "Approved" ? "green" : MD3Colors.error50}
                size={25}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const OrderDetail = ({ route }) => {
  const showToast = useToast();
  const navigation = useNavigation();
  const { data, orderId, orderStatus } = route.params;
  const [orderListData, setOrderListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataValue = data.sort((a, b) => a.id - b.id);
    setOrderListData(dataValue);
  }, [data]);

  const handlePressed = (data) => {
    const stateValue = [...orderListData];
    if (orderStatus !== "Approved") {
      if (data.status === "Pending") {
        data.status = "Approved";
      } else {
        data.status = "Pending";
      }

      for (let i in stateValue) {
        if (stateValue[i].id === data.id) {
          stateValue.splice(i, 1, data);
        }
      }

      setOrderListData(stateValue);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    const confirmedParams = [];

    for (let i in orderListData) {
      if (orderListData[i].status === "Approved") {
        confirmedParams.push(orderListData[i].id);
      }
    }

    const finalParams = {
      orderList: confirmedParams,
    };

    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      const user = JSON.parse(userData);

      axios
        .post(`${API()}/update_orders/${orderId}`, finalParams, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            showToast("Order successfully updated...");
            setLoading(false);
            setTimeout(() => {
              navigation.navigate("Order List");
            }, 500);
          }
        })
        .catch((error) => {
          console.log("Line: 24", error);
          setLoading(false);
        });
    } catch (e) {
      // remove error
      setLoading(false);
    }
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
      {orderStatus !== "Approved" && (
        <Pressable
          disabled={loading}
          onPress={handleConfirm}
          style={styles.order_confirm}
        >
          {loading ? (
            <ActivityIndicator animating={loading} color={MD2Colors.white} />
          ) : (
            <Text style={styles.order_confirm_text}>Confirm</Text>
          )}
        </Pressable>
      )}
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
    fontSize: 20,
  },
});

export default OrderDetail;
