import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { TextInput } from "react-native-paper";
import AuthenticateContext from "../context/AuthenticateContext";

const Register = () => {
  const auth = useContext(AuthenticateContext);
  const value = {
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [createUser, setCreateUser] = useState(value);
  const { name, email, phone, address, password, confirmPassword } = createUser;
  const [visible, setVisible] = useState({
    passwordV: false,
    confirmV: false,
  });
  const { passwordV, confirmV } = visible;

  const handleCreds = (name) => (value) => {
    setCreateUser({ ...createUser, [name]: value });
  };

  const handleChangeIcon = (data) => {
    console.log(data);
    if (data === "password") {
      setVisible({ ...visible, passwordV: passwordV ? false : true });
    } else {
      setVisible({ ...visible, confirmV: confirmV ? false : true });
    }
  };

  const handleAccount = () => {
    auth.handleAuth(false);
  };

  const handleSubmit = () => {
    console.log("registered");
  };

  console.log("Line 41", createUser);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.register_container}>
        <View style={styles.Logo_container}>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/croped.png")}
          />
        </View>
        <Text style={styles.loginText}>Sign Up</Text>
        <TextInput
          secureTextEntry={false}
          style={styles.inputField}
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={handleCreds("name")}
        />
        <TextInput
          secureTextEntry={false}
          style={styles.inputField}
          mode="outlined"
          label="Phone"
          value={phone}
          onChangeText={handleCreds("phone")}
        />
        <TextInput
          secureTextEntry={false}
          style={styles.inputField}
          mode="outlined"
          label="Address"
          value={address}
          onChangeText={handleCreds("address")}
        />
        <TextInput
          secureTextEntry={false}
          style={styles.inputField}
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={handleCreds("email")}
        />
        <TextInput
          right={
            <TextInput.Icon
              onPress={() => handleChangeIcon("password")}
              icon={passwordV ? "eye" : "eye-off"}
            />
          }
          style={styles.inputField}
          secureTextEntry={!passwordV}
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={handleCreds("password")}
        />
        <TextInput
          right={
            <TextInput.Icon
              onPress={() => handleChangeIcon("confirm")}
              icon={confirmV ? "eye" : "eye-off"}
            />
          }
          style={styles.inputField}
          secureTextEntry={!confirmV}
          mode="outlined"
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={handleCreds("confirmPassword")}
        />
        <View>
          <Text style={styles.accountText}>
            Have an Account?{" "}
            <Text style={styles.signUp} onPress={handleAccount}>
              Sign Up
            </Text>
          </Text>
        </View>
        <Pressable style={styles.pressable} onPress={handleSubmit}>
          <Text style={styles.pressText}>Sign Up</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  register_container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  Logo_container: {
    width: "100%",
    alignItems: "center",
  },
  tinyLogo: {
    height: 110,
    width: 180,
    marginBottom: 20,
  },
  loginText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
  },
  inputField: {
    marginBottom: 10,
  },
  accountText: {
    textAlign: "right",
    marginBottom: 10,
  },
  signUp: {
    textDecorationLine: "underline",
    color: "green",
    fontWeight: "700",
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
  forgot: {
    marginTop: 5,
    color: "green",
    fontWeight: "700",
  },
});

export default Register;
