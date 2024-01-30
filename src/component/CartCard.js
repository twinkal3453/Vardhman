import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { IMG } from "../../backend";

const CartCard = ({ item, handleRemove }) => {
  return (
    <SafeAreaView style={styles.safe_view}>
      <Pressable
        onLongPress={() => handleRemove(item)}
        style={styles.list_card}
      >
        <View style={styles.img_section}>
          {/*<FontAwesome name="user" size={35} color="grey" />*/}
          <Image
            style={styles.prodImage}
            source={{
              uri: `${IMG()}${item.product_image}`,
            }}
          />
        </View>
        <View style={styles.content_section}>
          <Text numberOfLines={3} style={styles.textName}>
            {item.product_name_eng}
          </Text>
          <Text>
            <Text style={styles.content}>Price:</Text>{" "}
            {item.product_price * item.qty}.00
          </Text>
          <Text>
            <Text style={styles.content}>Qty:</Text> {item.product_qty} *{" "}
            <Text>{item.qty}</Text>
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default CartCard;

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
