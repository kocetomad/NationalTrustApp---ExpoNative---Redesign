import * as React from "react";
import { useCallback, useMemo, useRef } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import MyMap from "./Mapview";
import { SafeAreaView, StyleSheet, Image, Linking,ScrollView } from "react-native";
import BottomDrawer from "react-native-bottom-drawer-view";
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {useState} from "react";
import Card from "./CardView"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/Home"
import Settings from "./screens/Settings";
import Notifications from "./HelloWorld";
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
    );
}



export default TabNav;