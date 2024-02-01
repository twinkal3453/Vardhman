import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import formatDate from "../Helper/utility";

const LeftContent = (props) => <Avatar.Icon {...props} icon="progress-clock" />;

const OrderCard = ({ item }) => {
  console.log("Line 5", item);
  const navigation = useNavigation();

  const handleOrderDetai = (data) => {
    navigation.navigate("Detail", {
      data: data,
    });
  };

  return (
    <SafeAreaView>
      <Card
        onPress={() => handleOrderDetai(item.orderList)}
        style={styles.list_card}
      >
        <Card.Title
          title={`Rs: ${item.total_amount}`}
          titleVariant="titleLarge"
          subtitle={`Date: ${formatDate(item.created_at)}`}
          left={LeftContent}
        />
      </Card>
    </SafeAreaView>
  );
};

export default OrderCard;

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
  },
});
