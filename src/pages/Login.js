import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useContext } from "react";
import AuthenticateContext from "../context/auth/AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../../backend";
import useToast from "../customHook/useToast";

const Login = () => {
  const showToast = useToast();
  const auth = useContext(AuthenticateContext);
  const creds = {
    email: "",
    password: "",
  };
  const [userDetail, setUserDetail] = useState(creds);
  const { email, password } = userDetail;
  const [eyeChange, setEyeChange] = useState(false);

  const handleCreds = (name) => (value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };

  // storing the data to the async storage
  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      auth.changeRoute(true);

      setUserDetail(creds);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (email && password) {
      const data = {
        firebase_token: "",
        username: email.toLowerCase(),
        password: password,
      };

      axios
        .post(`${API()}/user_login`, data, {
          Headers: {
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            showToast("Logged in Successfully");
            const resData = response.data;
            auth.handleRole(parseInt(resData.userData.role));
            const data = JSON.stringify(resData);
            storeData(data);
          }
        })
        .catch((error) => {
          console.log("Line 50", error);
        });
    }
  };

  const handleAccount = () => {
    auth.handleAuth(true);
  };

  // function is for forgot password
  const handleForgot = () => {
    console.log("Forgot Password!");
  };

  const handleChangeIcon = () => {
    console.log("changing");
    setEyeChange(!eyeChange);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // You may need to adjust this value
        >
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
            <View>
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
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
// <Text style={styles.forgot} onPress={handleForgot}>
//   Forgot Password?
// </Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
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
