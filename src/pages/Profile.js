import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthenticateContext from "../context/auth/AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vibration } from "expo";
import { Avatar, Button, Card } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const Profile = () => {
  const [userDetail, setuserDetail] = useState([]);
  const auth = useContext(AuthenticateContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      // Vibration.vibrate(500);
      auth.changeRoute(false);
      auth.handleRole();
    } catch (e) {
      // remove error
    }
  };
  //Function is to make sure that user is already logged in or not.
  const handleRouteAuth = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));

      const user = JSON.parse(userData);
      console.log("LIne 30", user.userData);
      setuserDetail(user.userData);
    } catch (e) {
      // remove error
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRouteAuth();
    }, [])
  );

  return (
    <View style={styles.MainComponent}>
      <Card>
        <Card.Title
          title={userDetail.name}
          titleVariant="titleLarge"
          subtitle={userDetail.email}
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">
            <Text style={styles.titleHead}>Mobile: </Text>
            +91 {userDetail.contact_no}
          </Text>
          <Text variant="bodyMedium">
            <Text style={styles.titleHead}>Address: </Text>
            {userDetail.address}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Pressable style={styles.pressable} onPress={handleLogout}>
            <Text style={styles.pressText}>Log out</Text>
          </Pressable>
        </Card.Actions>
      </Card>
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
  titleHead: {
    fontWeight: "600",
  },
});

export default Profile;
