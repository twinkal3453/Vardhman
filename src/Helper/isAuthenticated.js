import AsyncStorage from "@react-native-async-storage/async-storage";

export const isAuthenticated = async () => {
  const jsonValue = await AsyncStorage.getItem("user");
  const user = JSON.parse(jsonValue);
  //   console.log("Line is_authenticated", user);
  return JSON.parse(user);
};
