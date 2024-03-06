import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import ProductsCard from "../../component/ProductsCard";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { ApiTokenHeader } from "../../Helper/ApiTokenHeader";
import { API } from "../../../backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Searchbar } from "react-native-paper";
const HomeList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      // Vibration.vibrate(500);
      const user = JSON.parse(userData);

      // Making the Actual Api Call
      await axios
        .get(`${API()}/get_all_product_list`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.data;
            setProducts(data);
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
    getProducts();
  }, []);

  // when screen will active then this screen will auto refresh.
  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, [])
  );

  const getSerchedValue = (data) => {
    const query = searchQuery.toLowerCase();
    const value = data.filter((item) =>
      item.product_name_eng.toLowerCase().includes(query)
    );
    return value;
  };

  return (
    <View style={styles.main_component}>
      <View style={styles.searchBar}>
        <Searchbar
          style={styles.search}
          elevation={1}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={getSerchedValue(products)}
        renderItem={({ item }) => <ProductsCard item={item} />}
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
  searchBar: {
    padding: 3,
  },
  search: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
  },
});

export default HomeList;
