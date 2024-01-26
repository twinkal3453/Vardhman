import React, { useState, useEffect } from "react";
import AuthenticateContext from "./AuthenticateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthenticateState = (props) => {
  const [signUp, setSignUp] = useState(false);
  const [initialRoute, setInitialRoute] = useState(false);
  const [role, setRole] = useState(0);

  const handleRole = (data) => {
    setRole(data);
  };

  const handleAuth = (data) => {
    setSignUp(data);
  };

  const changeRoute = (data) => {
    setInitialRoute(data);
  };

  //Function is to make sure that user is already logged in or not.
  const handleRouteAuth = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));

      const user = JSON.parse(userData);
      if (user) {
        setInitialRoute(true);
        setRole(parseInt(user.userData.role));
      }
    } catch (e) {
      // remove error
    }
  };

  useEffect(() => {
    handleRouteAuth();
  }, []);

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
