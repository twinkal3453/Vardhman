import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Switch,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useContext } from "react";
import AuthenticateContext from "../context/AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const auth = useContext(AuthenticateContext);
  const creds = {
    email: "",
    password: "",
  };
  const [userDetail, setUserDetail] = useState(creds);
  const { email, password } = userDetail;
  const [eyeChange, setEyeChange] = useState(false);
  const [role, setRole] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleCreds = (name) => (value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };

  const handleSubmit = async () => {
    if (email && password) {
      const data = {
        email: email,
        role: isEnabled ? 1 : 0,
      };

      try {
        await AsyncStorage.setItem("user", JSON.stringify(data));
        auth.changeRoute(true);
        auth.handleRole(isEnabled ? 1 : 0);
        setUserDetail(creds);
      } catch (e) {
        // saving error
        console.log("error", e);
      }
    }
  };

  const handleAccount = () => {
    auth.handleAuth(true);
  };

  const handleForgot = () => {
    console.log("Forgot Password!");
  };

  const handleChangeIcon = () => {
    console.log("changing");
    setEyeChange(!eyeChange);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.login_container}>
        <View style={styles.Logo_container}>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/croped.png")}
          />
        </View>
        <Text style={styles.loginText}>Sign In</Text>
        <TextInput
          style={styles.inputField}
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={handleCreds("email")}
        />
        <TextInput
          right={
            <TextInput.Icon
              onPress={handleChangeIcon}
              icon={eyeChange ? "eye" : "eye-off"}
            />
          }
          style={styles.inputField}
          secureTextEntry={!eyeChange}
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={handleCreds("password")}
        />
        <View style={styles.accountType}>
          <View style={styles.switch_content}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.isAdmin_text}>Is Admin</Text>
          </View>
          <Text style={styles.accountText}>
            Don't have an Account?{" "}
            <Text style={styles.signUp} onPress={handleAccount}>
              Sign Up
            </Text>
          </Text>
        </View>
        <Pressable style={styles.pressable} onPress={handleSubmit}>
          <Text style={styles.pressText}>Sign In</Text>
        </Pressable>
        <Text style={styles.forgot} onPress={handleForgot}>
          Forgot Password?
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  login_container: {
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
  accountType: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switch_content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  isAdmin_text: {
    marginLeft: 5,
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

export default Login;
