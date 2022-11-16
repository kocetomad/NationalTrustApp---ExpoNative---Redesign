import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useState } from "react";

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
  const [settings, setSettings] = useState(false);

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Main") {
              iconName = focused
                ? "map-sharp"
                : "map-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings-sharp" : "settings-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#3c775b",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Group>
          <Tab.Screen name="Main" initialParams={{ settings:settings }} component={HomeScreen} options={{headerShown: false}}/>
          <Tab.Screen name="Settings" initialParams={{ setSettings:setSettings }} component={Settings} />
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNav;
