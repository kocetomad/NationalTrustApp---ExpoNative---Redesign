import React from "react";
import { CSVToArray } from "./Util";
import Badge from "./Badge";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
} from "react-native";
import { Button } from "react-native-paper";
import SelectedCardScreen from "./screens/SelectedCard";
import { useNavigation } from "@react-navigation/native";

const locationDetails = require("../assets/places.json");

//Bottom sheet cardview
const Card = ({ location }) => {
  //Mapping the location tags as Badge components 
  const MappedBAdges = ({ allTags }) => {
    return allTags.map((tag) => <Badge key={tag} name={tag}></Badge>);
  };
  const details = locationDetails.find((element) => element.id == location.id);

  const navigation = useNavigation();
  return (
    <View key={location.id} style={{ ...styles.card }}>
      <TouchableOpacity
        key={location.id}
        onPress={() => {
          navigation.navigate("Location detials", { loc: location });
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: location.imageUrl,
          }}
        />
        <Text
          style={{
            flex: 1,
            justifyContent: "flex-start",
            fontWeight: "bold",
            fontSize: 30,
            marginHorizontal: 5,
            flexDirection: "row",
            padding: 5,
          }}
        >
          {location.title}
        </Text>
        <Text style={{ padding: 5, marginHorizontal: 5, flexDirection: "row" }}>
          {details.description_strapline}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginTop: 10,
            flexWrap: "wrap",
          }}
        >
          <MappedBAdges
            allTags={
              location.activityTagsAsCsv
                ? location.activityTagsAsCsv.split(", ")
                : []
            }
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    height: "auto",
    width: "90%",
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1, //Centered vertically
  },
  tinyLogo: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
export default Card;
