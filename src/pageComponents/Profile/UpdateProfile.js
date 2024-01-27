import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import { Modal, Portal, Button, Divider, TextInput } from "react-native-paper";

const inputForm = [
  {
    type: "Name",
    value: "name",
  },
  {
    type: "Email",
    value: "email",
  },
  {
    type: "Phone",
    value: "phone",
  },
  {
    type: "Address",
    value: "address",
  },
  {
    type: "GST No",
    value: "gst_no",
  },
];

const UpdateProfile = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={styles.update_form}>
      <SafeAreaView>
        {inputForm.map((item, index) => {
          return (
            <TextInput
              key={index}
              style={styles.inputField}
              label={item.type}
              mode="outlined"
              //   value={text}
              //   onChangeText={(text) => setText(text)}
            />
          );
        })}
      </SafeAreaView>
      <Button>Update</Button>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
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
});
