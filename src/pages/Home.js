import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AuthenticateContext from "../context/AuthenticateContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeList from "../pageComponents/Home/HomeList";
import HomeDetail from "../pageComponents/Home/HomeDetail";

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeList} />
      <Stack.Screen name="Detail" component={HomeDetail} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  MainComponent: {
    padding: 10,
  },
});

export default Home;
