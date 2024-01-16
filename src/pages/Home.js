import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AuthenticateContext from "../context/AuthenticateContext";

const Home = () => {
  const auth = useContext(AuthenticateContext);

  useEffect(() => {
    console.log("Home", auth);
  }, []);

  return (
    <View style={styles.MainComponent}>
      <Text>Welcome to Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  MainComponent: {
    padding: 10,
  },
});

export default Home;
