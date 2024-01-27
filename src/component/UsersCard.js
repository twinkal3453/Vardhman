import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const UsersCard = ({ item }) => {
  const navigation = useNavigation();
  // handling managing single user.
  const handleUser = (data) => {
    navigation.navigate("User Detail", {
      data: data,
    });
  };
  return (
    <Pressable onPress={() => handleUser(item)} style={styles.list_card}>
      <View style={styles.img_section}>
        <FontAwesome name="user" size={35} color="grey" />
      </View>
      <View style={styles.content_section}>
        <Text>
          <Text style={styles.content}>Name:</Text> {item.name}
        </Text>
        <Text>
          <Text style={styles.content}>Email:</Text> {item.email}
        </Text>
        <Text>
          <Text style={styles.content}>Phone:</Text> {item.contact_no}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  list_card: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
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
    marginRight: 10,
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4d4d4",
    borderRadius: 3,
  },
  content: {
    fontWeight: "600",
  },
});

export default UsersCard;
