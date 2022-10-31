import * as React from "react";
import { useCallback, useMemo, useRef } from 'react';
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyMap from "./Mapview";
import { SafeAreaView, StyleSheet, Image, Linking,ScrollView } from "react-native";
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {useState} from "react";
import Card from "./CardView"

const TAB_BAR_HEIGHT = 1000;

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
  "https://raw.githubusercontent.com/AboutReact/sampleresource/master/";
  const proileImage = "react_logo.png";

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      {/*Top Large Image */}
      <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    alignSelf: "flex-start",
  },
});

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
    </View>
  );
}




export default function Notifications() {
  const [places, setVisiblePlaces] = useState([]);
  const bottomSheetRef = useRef(null);

// variables
const snapPoints = useMemo(() => ['25%', '50%'], []);

// callbacks
const handleSheetChanges = useCallback((index) => {
  console.log('handleSheetChanges', index);
}, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <MyMap style={{ flex: 1, justifyContent: "center", alignItems: "center" }} setPlaces={setVisiblePlaces}/>
      <BottomSheet
        ref={bottomSheetRef}setPlaces
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={sheetStyle.contentContainer}>
          <Text>{places.length} National trust locations in this area 🎉</Text>
        </View>
        <BottomSheetScrollView contentContainerStyle={sheetStyle.ScrollView}>
          <Card>
          <Text>asd</Text>
          </Card>
          <Card>
          <Text>asd</Text>
          </Card>
        </BottomSheetScrollView>
          
      </BottomSheet>
    </View>
  );
}

const sheetStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 0.15,
    alignItems: 'center',
  },
  ScrollView: {
    alignItems: 'center',
    
  },
});

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{ drawerLabel: "Updates" }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerLabel: "Profile" }}
      />
    </Drawer.Navigator>
  );
}
