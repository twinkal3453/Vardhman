import React, { useState, useEffect } from "react";
import AuthenticateContext from "./AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthenticateState = (props) => {
  const [signUp, setSignUp] = useState(false);
  const [initialRoute, setInitialRoute] = useState(false);
  const [role, setRole] = useState(0);

  useEffect(() => {
    const checkAuthentication = async () => {
      const jsonValue = await AsyncStorage.getItem("user");
      const isAuthenticated = JSON.parse(jsonValue);
      setRole(isAuthenticated.role);
      if (isAuthenticated) {
        setInitialRoute(true);
      }
    };

    checkAuthentication();
  }, []);

  const handleRole = (data) => {
    setRole(data);
  };

  const handleAuth = (data) => {
    setSignUp(data);
  };

  const changeRoute = (data) => {
    setInitialRoute(data);
  };

  return (
    <AuthenticateContext.Provider
      value={{
        signUp,
        initialRoute,
        role,
        handleAuth,
        changeRoute,
        handleRole,
      }}
    >
      {props.children}
    </AuthenticateContext.Provider>
  );
};
export default AuthenticateState;
