import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserList from "../pageComponents/Users/UserList";
import UserDetail from "../pageComponents/Users/UserDetail";

const Stack = createNativeStackNavigator();

const Users = () => {
  return (
    <Stack.Navigator initialRouteName="User List">
      <Stack.Screen name="User List" component={UserList} />
      <Stack.Screen name="User Detail" component={UserDetail} />
    </Stack.Navigator>
  );
};

export default Users;
