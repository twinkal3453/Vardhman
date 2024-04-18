import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthenticateContext from "../../context/auth/AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Card, FAB } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "../../../backend";
import axios from "axios";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const ProfileDetail = () => {
  const [userDetail, setuserDetail] = useState([]);
  const [token, setToken] = useState("");
  const auth = useContext(AuthenticateContext);
  const navigation = useNavigation();

  /**
   * The function `handleUser` navigates to the "Update" screen with user details.
   * @param data - The `data` parameter in the `handleUser` function seems to be unused in the provided
   * code snippet. If you have a specific question or need assistance with something related to the
   * `data` parameter, please let me know how you would like to use it in the function.
   */
  const handleUser = (data) => {
    navigation.navigate("Update", {
      detail: userDetail,
    });
  };

  console.log("Line 23", userDetail, token);

  /**
   * The `handleLogout` function sends a POST request to a server endpoint for user logout, removes
   * user and product data from AsyncStorage, and performs additional actions like changing routes and
   * handling user roles.
   */
  const handleLogout = () => {
    try {
      const data = {
        userId: userDetail.id,
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API()}/user_logout`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios
        .request(config)
        .then(async (response) => {
          if (response.status === 200) {
            console.log("Line 36 Logged out");
            await AsyncStorage.removeItem("user");
            // Vibration.vibrate(500);
            await AsyncStorage.removeItem("product");
            auth.changeRoute(false);
            auth.handleRole();
          }
        })
        .catch((error) => {
          console.log("Line 50", error.response.data);
        });
    } catch (e) {
      // remove error
    }
  };

  /**
   * The function `handleRouteAuth` retrieves user data and token from AsyncStorage and sets them in the
   * component state.
   */
  const handleRouteAuth = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));

      const user = JSON.parse(userData);

      setuserDetail(user.userData);
      setToken(user.token);
    } catch (e) {
      // remove error
    }
  };

  /* The `useFocusEffect` hook is used in React Navigation to run an effect when the screen comes into
 focus. In this code snippet, `useFocusEffect` is being used to call the `handleRouteAuth` function
 when the `ProfileDetail` screen comes into focus. */
  useFocusEffect(
    React.useCallback(() => {
      handleRouteAuth();
    }, [])
  );

  return (
    <React.Fragment>
      <View style={styles.MainComponent}>
        <Card>
          <Card.Title
            title={userDetail.name}
            titleVariant="titleLarge"
            subtitle={userDetail.email}
            left={LeftContent}
            right={() => (
              <FAB
                size="small"
                icon="pencil"
                style={styles.fab}
                onPress={handleUser}
              />
            )}
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
            <Text variant="bodyMedium">
              <Text style={styles.titleHead}>GST No: </Text>
              {userDetail.gst_no}
            </Text>
          </Card.Content>
          {userDetail.role !== "1" && (
            <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate("Orders")}
              >
                View Orders
              </Button>
            </View>
          )}
          <Card.Actions>
            <Pressable style={styles.pressable} onPress={handleLogout}>
              <Text style={styles.pressText}>Log out</Text>
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    </React.Fragment>
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
  fab: {
    marginRight: 15,
  },
});

export default ProfileDetail;
