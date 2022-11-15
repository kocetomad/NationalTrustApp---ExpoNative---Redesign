import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Alert,
  Suspense,
  TouchableOpacity,
} from "react-native";
const SearchLocation = ({ search, region, zoom, loading }) => {
  let out = <Text>Loading...</Text>;
  if (loading == ""){

  }
  if (zoom > 10.1) {
    out = (
      <TouchableOpacity
        style={styles.overlay}
        onPress={() => {
          search(region);
        }}
      >
        {loading == "loading" ? <Text style={{}}>Loading...</Text> : <Text style={{}}>Search in this area</Text>}
      </TouchableOpacity>
    );
  } else {
    out = (
      <View style={styles.overlay}>
        {loading == "loading" ? <Text style={{}}>Loading...</Text> : <Text style={{}}>Zoom in use area search</Text>}
      </View>
    );
  }
  return out;
};

const styles = StyleSheet.create({
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
export default SearchLocation;
