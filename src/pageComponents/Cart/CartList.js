import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartCard from "../../component/CartCard";
import ProductContext from "../../context/product/ProductContext";
import Toast from "react-native-toast-message";

const CartList = () => {
  const [prodData, setProdData] = useState([]);
  const prodCount = useContext(ProductContext);

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

  console.log("Line 27 Cart", prodData);

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

  return (
    <View style={styles.main_component}>
      <FlatList
        data={prodData}
        renderItem={({ item }) => (
          <CartCard handleRemove={handleRemove} item={item} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Pressable
        onPress={() => console.log("Placing the order...")}
        style={styles.Order_button}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Place Order</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Order_button: {
    padding: 10,
    backgroundColor: "#29ba54",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  main_component: {
    padding: 2,
    flex: 1,
  },
});

export default CartList;
