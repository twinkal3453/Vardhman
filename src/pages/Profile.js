import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import AuthenticateContext from "../context/AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const auth = useContext(AuthenticateContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      auth.changeRoute(false);
    } catch (e) {
      // remove error
    }
  };

  return (
    <View style={styles.MainComponent}>
      <Text>Hello profile.</Text>

      <Pressable style={styles.pressable} onPress={handleLogout}>
        <Text style={styles.pressText}>Log out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  MainComponent: {
    padding: 10,
  },
  pressable: {
    width: "100%",
    backgroundColor: "green",
    padding: 18,
    marginTop: 10,
    borderRadius: 5,
  },
  pressText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "600",
  },
});

export default Profile;
