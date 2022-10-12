import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {Marker} from "react-native-maps";
import { Component } from "react";


class myMap extends Component {
  state = { locations: {} };
  //do I have to async await?
  componentDidMount() {
    fetch("https://www.nationaltrust.org.uk/search/data/all-places")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ locations: res });
      })
      .catch(console.error);
  }
  
  mapMarkers = () => {
    console.log(this.state.locations.length)
    return this.state.locations.map((loc) => (
      <Marker
        key={loc.id}
        coordinate={{
          latitude: report.location.latitude,
          longitude: report.longitude,
        }}
        title={loc.title}
        description={loc.description}
      ></Marker>
    ));
  };
  render() {
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
          {this.mapMarkers()}
        </MapView>
      </View>
    );
  }
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

export default myMap;
