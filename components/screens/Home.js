import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import MyMap from "../Mapview";
import SelectedCardScreen from "./SelectedCard";
import { View, Text } from "react-native";
import BottomSheetMain from "../BottomSheet";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



const Home = () => {
  const [places, setVisiblePlaces] = useState([]);
  return (
    <View style={{ flex: 1 }}>
      <MyMap setPlaces={setVisiblePlaces} />
      <BottomSheetMain setPlaces={setVisiblePlaces} places={places} />
    </View>
  );
};

function HomeScreen() {
  
  const Stack = createStackNavigator();


  //const Stack = createStackNavigator();
 

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
      <Stack.Screen name="Home" component={Home} />

      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="Location detials" component={SelectedCardScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
const sheetStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 0.15,
    alignItems: "center",
  },
  ScrollView: {
    alignItems: "center",
  },
});
export default HomeScreen;
