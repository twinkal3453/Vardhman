import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileDetail from "../pageComponents/Profile/ProfileDetail";
import UpdateProfile from "../pageComponents/Profile/UpdateProfile";
import OrdersList from "../pageComponents/Profile/OrdersList";
import OrderDetail from "../pageComponents/Profile/OrderDetail";
import { Icon, MD3Colors } from "react-native-paper";
import { Pressable } from "react-native";
import LanguageContext from "../context/Language/LanguageContext";

const Stack = createNativeStackNavigator();

const Profile = () => {
  const { handleLanguage } = useContext(LanguageContext);

  return (
    <Stack.Navigator initialRouteName="Profile Detail">
      <Stack.Screen name="Profile Detail" component={ProfileDetail} />
      <Stack.Screen name="Update" component={UpdateProfile} />
      <Stack.Screen name="Orders" component={OrdersList} />
      <Stack.Screen
        name="Detail"
        component={OrderDetail}
        options={{
          headerRight: () => (
            <Pressable onPress={handleLanguage}>
              <Icon source="translate" color={MD3Colors.black} size={25} />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Profile;
