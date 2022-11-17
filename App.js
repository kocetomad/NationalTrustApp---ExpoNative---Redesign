import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNav from "./components/TabNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';

//Hides trivial warning, relating mostly to styling. Known issue with tha data Table component I am using 
LogBox.ignoreAllLogs();

export default function App() {
  console.log("App Launched");
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TabNav />
    </GestureHandlerRootView>
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
