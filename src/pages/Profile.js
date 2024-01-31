import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileDetail from "../pageComponents/Profile/ProfileDetail";
import UpdateProfile from "../pageComponents/Profile/UpdateProfile";
import OrdersList from "../pageComponents/Profile/OrdersList";
import OrderDetail from "../pageComponents/Profile/OrderDetail";

const Stack = createNativeStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator initialRouteName="Profile Detail">
      <Stack.Screen name="Profile Detail" component={ProfileDetail} />
      <Stack.Screen name="Update" component={UpdateProfile} />
      <Stack.Screen name="Orders" component={OrdersList} />
      <Stack.Screen name="Detail" component={OrderDetail} />
    </Stack.Navigator>
  );
};

export default Profile;
