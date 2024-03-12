import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthenticateContext from "../../context/auth/AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Card, FAB } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const ProfileDetail = () => {
  const [userDetail, setuserDetail] = useState([]);
  const auth = useContext(AuthenticateContext);
  const navigation = useNavigation();

  // handling managing single user.
  const handleUser = (data) => {
    navigation.navigate("Update", {
      detail: userDetail,
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      // Vibration.vibrate(500);
      await AsyncStorage.removeItem("product");
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
