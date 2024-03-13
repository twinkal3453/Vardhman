import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { TextInput } from "react-native-paper";
import AuthenticateContext from "../context/auth/AuthenticateContext";
import validator from "validator";
import { Icon } from "react-native-paper";
import axios from "axios";
import { API } from "../../backend";
import useToast from "../customHook/useToast";

const Register = () => {
  const showToast = useToast();
  const auth = useContext(AuthenticateContext);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const value = {
      name: name,
      contact_no: phone,
      address: address,
      email: email.toLowerCase(),
      password: password,
      firebase_token: "",
    };

    for (i in value) {
      if (i !== "firebase_token") {
        if (value[i] === "") {
          const data = {
            name: "Name",
            contact_no: "Phone",
            address: "Address",
            email: "Email",
            password: "Password",
          };
          console.log("Can not empty");
          showToast(`${data[i]} can not be empty!`, "TOP");
          setLoading(false);
          return;
        }
      }
    }

    if (!validator.isEmail(email)) {
      showToast(`Please provide a proper email!`, "TOP");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showToast(`Both password should be the same!`, "TOP");
      setLoading(false);
      return;
    }

    // Initiating api calls when all conditions passed.
    axios
      .post(`${API()}/user_register`, JSON.stringify(value), {
        Headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          showToast(response.data.message, "TOP");
          setTimeout(() => {
            handleAccount();
          }, 3000);
        }
      })
      .catch((error) => {
        console.log("Line 50", error);
        showToast("User Already exist!", "TOP");
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // You may need to adjust this value
        >
          <ScrollView>
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
                    Sign In
                  </Text>
                </Text>
              </View>
              <Pressable
                disabled={loading}
                style={styles.pressable}
                onPress={handleSubmit}
              >
                {loading ? (
                  <Text style={styles.pressText}>Loading...</Text>
                ) : (
                  <Text style={styles.pressText}>Sign Up</Text>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

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
  message: {
    padding: 5,
    marginTop: 5,
    backgroundColor: "#f5426c",
    opacity: ".5",
    width: "100%",
    borderRadius: 5,
    color: "black",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  successMessage: {
    padding: 5,
    marginTop: 5,
    backgroundColor: "#bdffab",
    opacity: ".5",
    width: "100%",
    borderRadius: 5,
    color: "black",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  messageText: {
    color: "black",
    fontSize: 20,
  },
});

export default Register;
