import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Switch } from "react-native-paper";
import React, { useState, useCallback, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../../backend";
import LoaderContext from "../../context/loader/LoaderContext";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const UserDetail = ({ route }) => {
  const Loader = useContext(LoaderContext);
  const { data } = route.params;
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [initialState, setInitialState] = useState(false);

  const onToggleSwitch = () => {
    setInitialState(true);
    setIsSwitchOn(!isSwitchOn);
  };

  const getSwitchAction = () => {
    const action = {
      1: true,
      2: false,
      0: false,
    };
    setIsSwitchOn(action[data.is_approved]);
  };

  // when screen will active then this screen will auto refresh.
  useFocusEffect(
    useCallback(() => {
      getSwitchAction();
    }, [])
  );

  const updateStatus = async () => {
    const statusValue = {
      userId: data.id,
      approvalStatus: isSwitchOn ? "1" : "2",
    };

    if (initialState) {
      Loader.handleLoader(true);
      try {
        const userData = JSON.parse(await AsyncStorage.getItem("user"));
        // Vibration.vibrate(500);
        const user = JSON.parse(userData);

        // Making the Actual Api Call

        await axios
          .post(`${API()}/user_approval_by_admin`, statusValue, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              Loader.handleLoader(false);
              console.log("Line 53 response", response.data);
            }
          })
          .catch((error) => {
            Loader.handleLoader(false);
            console.log("Line 76", error);
          });
      } catch (e) {
        // remove error
        Loader.handleLoader(false);
        console.log("Line 11 error", e);
      }
    }
  };

  useEffect(() => {
    updateStatus();
  }, [isSwitchOn]);

  return (
    <View style={styles.main_detail}>
      <Card>
        <Card.Title
          title={data.name}
          titleVariant="titleLarge"
          subtitle={data.email}
          left={LeftContent}
          right={(prpps) => (
            <View style={styles.switch_parent}>
              <Switch
                style={styles.switches}
                {...prpps}
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
              />
              <Text>{isSwitchOn ? "Active" : "Inactive"}</Text>
            </View>
          )}
        />
        <Card.Content>
          <Text variant="titleLarge">
            <Text style={styles.titleHead}>Phone: </Text>
            {data.contact_no}
          </Text>
          <Text variant="bodyMedium">
            <Text style={styles.titleHead}>Address: </Text>
            {data.address}
          </Text>
        </Card.Content>
        {/**
      
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      
      */}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  item_img: {
    borderRadius: 4,
    padding: 5,
  },
  main_detail: {
    padding: 5,
  },
  titleHead: {
    fontWeight: "600",
  },
  switch_parent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  switches: {
    marginBottom: 5,
  },
});

export default UserDetail;
