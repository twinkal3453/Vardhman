import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Button,
  Card,
  Text,
  FAB,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { IMG } from "../../../backend";
import AuthenticateContext from "../../context/auth/AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductContext from "../../context/product/ProductContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import useToast from "../../customHook/useToast";

const HomeDetail = ({ route }) => {
  const showToast = useToast();
  const navigation = useNavigation();
  const auth = useContext(AuthenticateContext);
  const prodCount = useContext(ProductContext);
  const { data } = route.params;
  const [count, setCount] = useState("1");
  const [addedToCart, setAddedToCart] = useState(false);

  const getCartData = async () => {
    try {
      const prodData = JSON.parse(await AsyncStorage.getItem("product"));

      const findProductFromCart =
        prodData && prodData.find((item) => item.id === data.id);

      if (findProductFromCart) {
        setAddedToCart(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getCartData();
    }, [])
  );

  const handleCount = (data) => {
    // if (data === "inc") {
    //   setCount(count + 1);
    // } else {
    //   if (count > 1) {
    //     setCount(count - 1);
    //   }
    // }
    setCount(parseInt(data));
  };

  const handleCalcPrice = (data) => {
    let value;
    if (count) {
      value = parseFloat(data) * count;
    } else {
      value = parseFloat(data) * 1;
    }

    return value;
  };

  /**
   * The handleAdd function retrieves product data from AsyncStorage, updates the quantity of a
   * product, adds the product to a list, and navigates to the Home screen after a short delay.
   */
  const handleAdd = async () => {
    if (!count) {
      showToast("Please add count...", "TOP");
      return;
    }
    try {
      /* `const prodData = await AsyncStorage.getItem("product");` is retrieving the data stored in the
     AsyncStorage under the key "product". The retrieved data is then stored in the variable
     `prodData`. */
      const prodData = await AsyncStorage.getItem("product");
      const productList = JSON.parse(prodData);

      data.qty = count;

      /* This block of code is handling the logic for adding a product to the cart stored in
      AsyncStorage. Here's a breakdown of what it does: */
      if (productList) {
        productList.push(data);
        await AsyncStorage.setItem("product", JSON.stringify(productList));
        setAddedToCart(true);
      } else {
        await AsyncStorage.setItem("product", JSON.stringify([data]));
        setAddedToCart(true);
      }
      setTimeout(() => {
        navigation.navigate("Home");
      }, 500);
      prodCount.handleProdUpdate(Date.now());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // You may need to adjust this value
        >
          <View style={styles.card_Parent}>
            <Card>
              <Card.Cover
                style={styles.item_img}
                source={{
                  uri: `${IMG()}${data.product_image}`,
                }}
              />
              <Card.Content>
                <Text variant="titleMedium">{data.product_name_eng}</Text>
                <Text variant="titleMedium">{data.product_name_guj}</Text>
                <Text variant="titleMedium">{data.product_name_hin}</Text>
                <Text variant="titleMedium">
                  HSN Code: {data.product_hsn_code}
                </Text>
              </Card.Content>
              <Card.Content style={styles.middle_contnet}>
                <Text variant="titleMedium">
                  Rs.{handleCalcPrice(data.product_price)}
                </Text>
                <Text variant="bodyMedium">
                  Qty: {data.product_qty} * {count ? count : "0"}
                </Text>
              </Card.Content>
              {auth.role === 0 && (
                <Card.Actions>
                  <View style={styles.counter_parent}>
                    {/*<FAB
                size="small"
                icon="minus"
                style={styles.fab}
                onPress={() => handleCount("dec")}
              />
              <Text style={styles.count_text}>{count}</Text>
              <FAB
                size="small"
                icon="plus"
                style={styles.fab}
                onPress={() => handleCount("inc")}
                />*/}
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>
                      Add Count:{" "}
                    </Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(e) => handleCount(e)}
                      value={count}
                      keyboardType="numeric"
                      placeholder="Count"
                    />
                  </View>
                  <Button
                    disabled={addedToCart}
                    onPress={handleAdd}
                    mode="outlined"
                    icon="cart"
                  >
                    Add to cart
                  </Button>
                </Card.Actions>
              )}
            </Card>
            {addedToCart && (
              <View style={styles.alert_card}>
                <Text style={{ textAlign: "center", fontWeight: 500 }}>
                  Added to cart...
                </Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  item_img: {
    borderRadius: 4,
    padding: 5,
  },
  card_Parent: {
    padding: 5,
  },
  detail_component: {
    padding: 10,
  },
  middle_contnet: {
    padding: 4,
  },
  counter_parent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  count_text: {
    marginHorizontal: 10,
  },
  alert_card: {
    marginTop: 10,
    backgroundColor: "#ffb8b8",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    width: 70,
    height: 40,
    borderRadius: 40,
    paddingHorizontal: 10,
  },
});

export default HomeDetail;
