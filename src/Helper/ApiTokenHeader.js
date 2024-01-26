import AsyncStorage from "@react-native-async-storage/async-storage";

export const ApiTokenHeader = async () => {
  let token = "";
  try {
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    // Vibration.vibrate(500);
    const user = JSON.parse(userData);
    token = user.token;
  } catch (e) {
    // remove error
    console.log("Line 11 error", e);
  }

  console.log("LIne 15", token);
  return token;
};
