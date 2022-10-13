import * as React from "react";
import {useState, useEffect} from 'react'
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {Marker} from "react-native-maps";
import { Component } from "react";


  
  
  export default function MyMap() {
    const [state, setState] = useState(null);

    //do I have to async await?
    useEffect(() => {
      fetch("https://www.nationaltrust.org.uk/search/data/all-places")
      .then((res) => res.json())
      .then((data) => {
        console.log("data ", data)
        setState(data);
      })
      .catch(console.error);
    })

    const MapMarkers = () => {
      console.log("state ", state)
      const mapMarkers = [];

      for(let obj in state) {
        mapMarkers.push(state[obj].locations)
      }

      console.log("mapMarkers ", mapMarkers)

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
