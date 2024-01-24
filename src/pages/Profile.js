import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import AuthenticateContext from "../context/auth/AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vibration } from "expo";
import { Avatar, Button, Card } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const Profile = () => {
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

  return (
    <View style={styles.MainComponent}>
      <Card>
        <Card.Title
          title="Twinkal Raj"
          titleVariant="titleLarge"
          titleLarge
          subtitle="twinkal@gmail.com"
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">
            <Text style={styles.titleHead}>Mobile: </Text>6767677676
          </Text>
          <Text variant="bodyMedium">
            <Text style={styles.titleHead}>Address: </Text>Bhilwara, Rajasthan
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
