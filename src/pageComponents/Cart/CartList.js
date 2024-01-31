import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartCard from "../../component/CartCard";
import ProductContext from "../../context/product/ProductContext";
import Toast from "react-native-toast-message";
import axios from "axios";
import { API } from "../../../backend";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const CartList = () => {
  const [prodData, setProdData] = useState([]);
  const prodCount = useContext(ProductContext);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const getProductData = async () => {
    try {
      const data = await AsyncStorage.getItem("product");

      if (data) {
        const parsedData = JSON.parse(data);

        setProdData(parsedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getProductData();
    }, [])
  );

  const handleRemove = async (data) => {
    const filteredData = prodData.filter((item) => item.id !== data.id);

    try {
      // Toast.show({
      //   type: "success",
      //   text1: "Hello",
      //   text2: "This is Removed 👋",
      // });
      setProdData(filteredData);
      prodCount.handleProdUpdate(Date.now());
      await AsyncStorage.setItem("product", JSON.stringify(filteredData));
    } catch (error) {
      console.log(error);
    }
  };

  // Remove the cart after placing the order
  const removeCart = async () => {
    try {
      await AsyncStorage.removeItem("product");
      setProdData([]);
      prodCount.handleProdUpdate(Date.now());
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      // Vibration.vibrate(500);
      const user = JSON.parse(userData);

      const submitProd = [];

      for (let i in prodData) {
        const data = {
          product: prodData[i].id,
          qty: prodData[i].qty,
        };
        submitProd.push(data);
      }

      const params = {
        userId: user.userData.id,
        productList: submitProd,
      };

      console.log("Line 70....", user.token);

      axios
        .post(`${API()}/generate_orders`, params, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Line 81", response.data);
            setIsAdded(true);
            setLoading(false);

            setTimeout(() => {
              removeCart();
              setIsAdded(false);
            }, 1000);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.main_component}>
      <FlatList
        data={prodData}
        renderItem={({ item }) => (
          <CartCard handleRemove={handleRemove} item={item} />
        )}
        keyExtractor={(item) => item.id}
      />
      {isAdded && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
            marginVertical: 5,
          }}
        >
          Order is Placed.
        </Text>
      )}
      {prodData.length > 0 && (
        <Pressable
          disabled={loading}
          onPress={handlePlaceOrder}
          style={styles.Order_button}
        >
          {!loading ? (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 17,
                marginVertical: 2,
              }}
            >
              Place Order
            </Text>
          ) : (
            <ActivityIndicator animating={true} color={MD2Colors.white} />
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Order_button: {
    padding: 12,
    backgroundColor: "#29ba54",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  main_component: {
    padding: 2,
    flex: 1,
  },
});

export default CartList;
