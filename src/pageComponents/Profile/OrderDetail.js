import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { IMG } from "../../../backend";

const OrderListCard = ({ item }) => {
  return (
    <SafeAreaView style={styles.safe_view}>
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
          <Text>
            <Text style={styles.content}>Price:</Text> {item.amount}
          </Text>
          <Text>
            <Text style={styles.content}>Qty:</Text> {item.qty}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const OrderDetail = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={{ padding: 2 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <OrderListCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
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
});
