import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useState, useContext } from "react";
import {
  TextInput,
  Dialog,
  Portal,
  PaperProvider,
  Button,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../../../backend";
import AuthenticateContext from "../../context/auth/AuthenticateContext";

const inputForm = [
  {
    name: "Name",
    value: "name",
    type: "singleline",
  },
  {
    name: "Email",
    value: "email",
    type: "singleline",
  },
  {
    name: "Phone",
    value: "phone",
    type: "singleline",
  },
  {
    name: "Address",
    value: "address",
    type: "multiline",
  },
  {
    name: "GST No",
    value: "gst_no",
    type: "singleline",
  },
];

const UpdateProfile = ({ route }) => {
  const { detail } = route.params;
  const value = {
    name: detail.name,
    email: detail.email,
    phone: detail.contact_no,
    address: detail.address,
    gst_no: detail.gst_no,
  };
  const [inputValues, setInputValues] = useState(value);
  const { name, email, phone, address, gst_no } = inputValues;
  const [visible, setVisible] = React.useState(false);
  const auth = useContext(AuthenticateContext);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleChange = (name) => (value) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleLogout = async () => {
    hideDialog();
    try {
      await AsyncStorage.removeItem("user");
      // Vibration.vibrate(500);
      auth.changeRoute(false);
      auth.handleRole();
    } catch (e) {
      // remove error
    }
  };

  const handleSubmit = async () => {
    const value = {
      userId: detail.id,
      name: name,
      email: email,
      contact_no: phone,
      address: address,
      gst_no: gst_no,
    };

    // Calling the API to update the profile.
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      // Vibration.vibrate(500);
      const user = JSON.parse(userData);

      // Making the Actual Api Call
      await axios
        .post(`${API()}/update_user_profile`, value, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            console.log("Line 87", data);
            // navigation.navigate("Profile Detail");
            handleLogout();
          }
        })
        .catch((error) => {
          console.log("Line 76", error);
        });
    } catch (e) {
      // remove error
      console.log("Line 11 error", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // You may need to adjust this value
        >
          <PaperProvider>
            <View style={styles.update_form}>
              {inputForm.map((item, index) => {
                return (
                  <TextInput
                    multiline={item.type === "multiline" ? true : false}
                    key={index}
                    style={styles.inputField}
                    label={item.name}
                    mode="outlined"
                    value={inputValues[item.value]}
                    onChangeText={handleChange(item.value)}
                  />
                );
              })}
              <Pressable onPress={showDialog} style={styles.pressable}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: 600 }}>
                  Update Profile
                </Text>
              </Pressable>
            </View>

            <View>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Alert</Dialog.Title>
                  <Dialog.Content>
                    <Text variant="bodyMedium">
                      While updating your profile, you may need to login!
                    </Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancle</Button>
                    <Button onPress={handleSubmit}>Done</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </PaperProvider>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  update_form: {
    padding: 10,
  },
  profile_update: {
    textAlign: "center",
    marginBottom: 10,
  },
  inputField: {
    marginTop: 5,
  },
  pressable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 5,
    padding: 13,
    marginTop: 13,
  },
});
