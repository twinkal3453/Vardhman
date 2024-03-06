import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeList from "../pageComponents/Home/HomeList";
import HomeDetail from "../pageComponents/Home/HomeDetail";
import { Pressable } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeList}
        options={{
          headerRight: () => (
            <Pressable onPress={() => console.log("Line 18 Pressed")}>
              <Icon source="translate" color={MD3Colors.black} size={20} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="Detail" component={HomeDetail} />
    </Stack.Navigator>
  );
};

export default Home;
