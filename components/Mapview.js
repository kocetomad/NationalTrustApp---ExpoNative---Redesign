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
  Image,
  Suspense,
  TouchableOpacity,
} from "react-native";
import { Marker, Polygon, Geojson, Callout } from "react-native-maps";
import { Component } from "react";
import * as Location from "expo-location";
import * as Util from "./Util";
import { MapGeoJson } from "./Util";
import { useNavigation } from "@react-navigation/native";
import SearchLocation from "./SearchLocation";

const locs = require("../assets/all-places.json");

export default function MyMap({
  places,
  setPlaces,
  setAllLocations,
  settings,
  setBottomSheetState,
}) {
  const [state, setData] = useState([
    {
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
      websiteUrl:
        "https://www.nationaltrust.org.uk/divis-and-the-black-mountain",
      type: "PLACE",
      location: { latitude: 54.60074, longitude: -6.041651 },
      activityTagsAsCsv: "Dog walking, Running, Walking",
      displayable: true,
    },
  ]);
  const [focusedRegion, setFocusedRegion] = useState({
    zoom: 11,
    region: {
      latitude: 50.641718,
      longitude: -3.408798,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const [loadingStatus, setLoadingStatus] = useState("loaded");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  //FETCHING ALL NATIONAL TRUST LOCATIONS
  useEffect(() => {
    (async () => {
      const mapMarkers = [];
      for (let obj in locs) {
        mapMarkers.push(locs[obj]);
      }
      return mapMarkers;
    })()
      .then((data) => {
        setData(data);
        setPlaces(data.slice(0, 20));
        setBottomSheetState({text: "20 Most popular destinations 🔥" });

        setAllLocations(data);
      })
      .catch(console.error);
  }, []);

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

  onRegionChange = (region) => {
    // this.setState({ region });
  };

  onRegionChangeComplete = (region) => {
    (async function () {
      const windowWidth = Dimensions.get("window").width;
      let zoom =
        Math.log2(360 * (windowWidth / 256 / region.longitudeDelta)) + 1;
      if (zoom > 10.1) {
        
      } else {
        setBottomSheetState({text: "20 most popular destinations 🔥" });
        setPlaces(state.slice(0, 20));
      }
      let reg = {
        zoom: zoom,
        region: region,
      };
      setFocusedRegion(reg);
    })().then(() => {
      setLoadingStatus("loaded");
    });
  };

  const localSearchPress = (region) => {
    // this.setState({ region });
    setLoadingStatus("loading");

    (async function () {
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
      return newArray;
    })().then((newArray) => {
      setLoadingStatus("loaded");
      setBottomSheetState({text: newArray.length + " National trust locations in the filtered area 🎉" })
    });
  };

  const navigation = useNavigation();

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
        animationEnabled={false}
      >
        <MapGeoJson zonesEnabled={settings} />
        {state.map((loc) => (
          <Marker
            key={loc.id}
            pinColor={"#3c775b"}
            tracksViewChanges={false}
            coordinate={{
              latitude: loc.location.latitude,
              longitude: loc.location.longitude,
            }}
            title={loc.title}
            description={loc.description}
          >
            <Callout
              tooltip
              onPress={() =>
                navigation.navigate("Location detials", { loc: loc })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  maxWidth: 300,
                  alignSelf: "center",
                }}
              >
                <View style={{ alignItems: "flex-start" }}>
                  <Text
                    style={{
                      backgroundColor: "#3c775b",
                      width: "100%",
                      padding: 7,
                      color: "white",
                      fontSize: 17,
                    }}
                  >
                    {loc.title}
                  </Text>
                  <Text style={{ padding: 7 }}>{loc.description}</Text>
                </View>

                {/* <Text style={{}}>
                
                  
                </Text> */}
              </View>
            </Callout>
          </Marker>
        ))}
        {/* <UserMarker/> */}
      </MapView>
      <SearchLocation
        search={localSearchPress}
        region={focusedRegion.region}
        zoom={focusedRegion.zoom}
        loading={loadingStatus}
      ></SearchLocation>
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
    shadowColor: "black",
    shadowRadius: 6,
    shadowOpacity: 0.4,
    padding: 10,
    marginRight: 5,
    elevation: 10,
    borderRadius: 10,
    borderColor: "black",
    marginBottom: 10,
    justifyContent: "center", //Centered vertically
    position: "absolute",
    top: 20,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});
