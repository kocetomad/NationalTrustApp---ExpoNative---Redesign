import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import Settings from "./screens/Settings";
import SelectedCardScreen from "./screens/SelectedCard";
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4F8EF7',
    card: '#c5c1bc',
    text: 'rgb(28, 28, 30)',
  },
};

function TabNav() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-list-outline" : "ios-list";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Group>
          <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNav;
