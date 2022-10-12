import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyDrawer from "./components/HelloWorld";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  console.log("App Launched");
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
