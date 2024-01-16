import React, { useState, useEffect } from "react";
import AuthenticateContext from "./AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthenticateState = (props) => {
  const [signUp, setSignUp] = useState(false);
  const [initialRoute, setInitialRoute] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await AsyncStorage.getItem("user");
      console.log("Is Authenticated:", isAuthenticated);

      if (isAuthenticated) {
        setInitialRoute(true);
      }
    };

    checkAuthentication();
  }, []);

  const handleAuth = (data) => {
    setSignUp(data);
  };

  const changeRoute = (data) => {
    setInitialRoute(data);
  };

  return (
    <AuthenticateContext.Provider
      value={{ signUp, initialRoute, handleAuth, changeRoute }}
    >
      {props.children}
    </AuthenticateContext.Provider>
  );
};
export default AuthenticateState;
