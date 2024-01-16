import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import AuthenticateContext from "./context/AuthenticateContext";
import { BottomNavigation, Icon, IconButton } from "react-native-paper";
import Profile from "./Profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Authentication = () => {
  const auth = useContext(AuthenticateContext);
  return auth.signUp ? <Register /> : <Login />;
};

const ParentStackNavigator = () => {
  const auth = useContext(AuthenticateContext);

  return (
    <React.Fragment>
      {!auth.initialRoute ? (
        <Authentication />
      ) : (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              // options={{
              //   tabBarIcon: () => (
              //     <IconButton name="home" color="grey" size={200} />
              //   ),
              // }}
              name="Home"
              component={Home}
            />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </React.Fragment>
  );
};

export default ParentStackNavigator;
