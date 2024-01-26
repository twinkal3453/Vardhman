import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AuthenticateContext from "./context/auth/AuthenticateContext";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import { isAuthenticated } from "./Helper/isAuthenticated";

const Tab = createBottomTabNavigator();

const Authentication = () => {
  const auth = useContext(AuthenticateContext);
  return auth.signUp ? <Register /> : <Login />;
};

const ParentStackNavigator = () => {
  const data = useContext(AuthenticateContext);

  return (
    <React.Fragment>
      {!data.initialRoute ? (
        <Authentication />
      ) : (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" size={size} color={color} />
                ),
                headerShown: false,
              }}
              name="Homes"
              component={Home}
            />
            {data.role === 1 && (
              <Tab.Screen
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5
                      name="cart-arrow-down"
                      size={size}
                      color={color}
                    />
                  ),
                  headerShown: false,
                }}
                name="Orders"
                component={Orders}
              />
            )}
            {data.role === 1 ? (
              <Tab.Screen
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="user" size={size} color={color} />
                  ),
                  headerShown: false,
                }}
                name="Users"
                component={Users}
              />
            ) : (
              <Tab.Screen
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome
                      name="shopping-cart"
                      size={size}
                      color={color}
                    />
                  ),
                  headerShown: false,
                }}
                name="Cart"
                component={Cart}
              />
            )}

            <Tab.Screen
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="face-man-profile"
                    size={size}
                    color={color}
                  />
                ),
                // headerShown: false,
              }}
              name="Profile"
              component={Profile}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </React.Fragment>
  );
};

export default ParentStackNavigator;
