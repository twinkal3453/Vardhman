import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserList from "../pageComponents/Users/UserList";
import UserDetail from "../pageComponents/Users/UserDetail";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import LoaderContext from "../context/loader/LoaderContext";

const Stack = createNativeStackNavigator();

const Users = () => {
  const loader = useContext(LoaderContext);

  return (
    <Stack.Navigator initialRouteName="User List">
      <Stack.Screen name="User List" component={UserList} />
      <Stack.Screen
        name="User Detail"
        component={UserDetail}
        options={{
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <ActivityIndicator
                animating={loader.loader}
                color={MD2Colors.blue500}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Users;
