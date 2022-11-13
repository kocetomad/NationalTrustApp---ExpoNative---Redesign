import * as React from "react";
import { useState, useEffect } from "react";
//import MapView from "react-native-maps";
import MapView from "react-native-map-clustering";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Alert,
  Suspense,
  TouchableOpacity
} from "react-native";
import { Marker, Polygon, Geojson } from "react-native-maps";
import { Component } from "react";
import * as Location from "expo-location";
import * as Util from "./Util";
import { MapGeoJson } from "./Util";
import Badge from "./Badge";

export default function MyMap({places, setPlaces, setAllLocations }) {
  const [state, setData] = useState([{
    openingTimeStatus: "Open today",
    cmsRegion: "RegionNorthernIreland",
    imagePath:
      "/images/1431915684674-ntdivismartyfennell-mfphotography061221.jpg",
    id: "2546",
    title: "Divis and the Black Mountain",
    subTitle: "near Belfast, County Antrim",
    description:
      "Divis and the Black Mountain offers a spectacular viewpoint for walkers seeking panoramic views over Belfast and beyond",
    imageUrl:
      "https://nt.global.ssl.fastly.net/images/1431915684674-ntdivismartyfennell-mfphotography061221.jpg",
    imageDescription: "Sunset over Divis and the Black Mountain",
    alternativeImages: [],
    websiteUrl: "https://www.nationaltrust.org.uk/divis-and-the-black-mountain",
    type: "PLACE",
    location: { latitude: 54.60074, longitude: -6.041651 },
    activityTagsAsCsv: "Dog walking, Running, Walking",
    displayable: true,
  }]);
  const [spinner, spinnerState] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapMarkers = [];

  //FETCHING ALL NATIONAL TRUST LOCATIONS
  useEffect(() => {
    fetch("https://www.nationaltrust.org.uk/search/data/all-places")
      .then((res) => res.json())
      .then((data) => {
        for (let obj in data) {
          mapMarkers.push(data[obj]);
        }
        //setPlaces(mapMarkers);
        //console.log("item 1", data["1"].location)
        setData(mapMarkers);
        setAllLocations(mapMarkers);

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
  } else if (location) {
    text = JSON.stringify(location);
  }

  //Alert on user location fail
  const createTwoButtonAlert = () =>
    Alert.alert("User location error", "Could not fetch user location", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
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
        pinColor={"green"}
        title={"Your location"}
      ></Marker>
    );
  };

  onRegionChange = (region) => {
    // this.setState({ region });
  };
  // useEffect(() => {
  //   console.log("done loading")
  // }, [places]);
  onRegionChangeComplete = (region) => {
    const windowWidth = Dimensions.get('window').width;
    let zoom = Math.log2(360 * (windowWidth / 256 / region.longitudeDelta)) + 1
    console.log(
      zoom
      );
    // this.setState({ region });
    if(zoom>10.1){
      let boundry = Util.getBoundByRegion(region);
      var newArray = state.filter(function (el) {
      return (
        el.location.latitude <= boundry.maxLat &&
        el.location.latitude >= boundry.minLat &&
        el.location.longitude <= boundry.maxLng &&
        el.location.longitude >= boundry.minLng
      );
    });
      setPlaces(newArray);
    }else{
      setPlaces(state.slice(0, 20));
    }
    
  
  };

  // const MapMarkers = () => {
  //   return(
        
    
  // };

  return (
    <View style={styles.container}>
    
      <MapView
        style={styles.map}
        onRegionChangeComplete={onRegionChangeComplete}
        initialRegion={{
          latitude: 50.641718,
          longitude: -3.408798,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapGeoJson />
        {/* <MapMarkers/> */}
        {state.map((loc) => (
          <Marker
            key={loc.id}
            tracksViewChanges={false}
            coordinate={{
              latitude: loc.location.latitude,
              longitude: loc.location.longitude,
            }}
            title={loc.title}
            description={loc.description}
          ></Marker>
        ))}
        {/* <UserMarker/> */}
      </MapView>
      <TouchableOpacity style={styles.overlay}>
        <Text style={{}}>Touchable Opacity</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});
