import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeList from "../pageComponents/Home/HomeList";
import HomeDetail from "../pageComponents/Home/HomeDetail";
import { Pressable } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";
import LanguageContext from "../context/Language/LanguageContext";

const Stack = createNativeStackNavigator();

const Home = () => {
  const { handleLanguage } = useContext(LanguageContext);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeList}
        options={{
          headerRight: () => (
            <Pressable onPress={handleLanguage}>
              <Icon source="translate" color={MD3Colors.black} size={25} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="Detail" component={HomeDetail} />
    </Stack.Navigator>
  );
};

export default Home;
