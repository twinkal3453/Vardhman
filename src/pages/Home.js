import React from "react";
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

export default Home;
