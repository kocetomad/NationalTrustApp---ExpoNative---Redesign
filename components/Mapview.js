import * as React from "react";
import { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Platform, Alert } from "react-native";
import { Marker } from "react-native-maps";
import { Component } from "react";
import * as Location from "expo-location";

export default function MyMap() {
  const [state, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  //FETCHING ALL NATIONAL TRUST LOCATIONS
  useEffect(() => {
    fetch("https://www.nationaltrust.org.uk/search/data/all-places")
      .then((res) => res.json())
      .then((data) => {
        //console.log("item 1", data["1"].location)
        setData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    createTwoButtonAlert();
    text = errorMsg;
    console.log("test", text);
  } else if (location) {
    text = JSON.stringify(location);
    console.log("test", location.coords);
  }

  //Alert on user location fail
  const createTwoButtonAlert = () =>
  Alert.alert('User location error', 'Could not fetch user location', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'OK', onPress: () => console.log('OK Pressed') },
  ]);

  //User location pin
  const UserMarker = () => {
    return (
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        
        image={require("../assets/user-pin.png")}
        pinColor = {'green'}
        title={"Your location"}
      ></Marker>
    );
  };

  const MapMarkers = () => {
    //console.log("state ", state)
    const mapMarkers = [];

    for (let obj in state) {
      mapMarkers.push(state[obj]);
    }

    console.log("mapMarkers ", mapMarkers[0]);

    return mapMarkers.map((loc) => (
      <Marker
        key={loc.id}
        coordinate={{
          latitude: loc.location.latitude,
          longitude: loc.location.longitude,
        }}
        title={loc.title}
        description={loc.description}
      ></Marker>
    ));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapMarkers />
        <UserMarker/>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
