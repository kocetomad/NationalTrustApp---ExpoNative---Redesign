import React from "react";
import { CSVToArray } from "./Util";
import Badge from "./Badge";
import { View, StyleSheet, Image, Text } from "react-native";
const Card = ({ location }) => {
  const MappedBAdges = ({allTags}) => {
    //console.log("state ", state)
    return allTags.map((tag) => (
      <Badge name={tag}></Badge>
    ));
  };

  return (
    <View style={{ ...styles.card }}>
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
          flexDirection: "row"
        }}
      >
        {location.title}
      </Text>
      <Text style={{ marginHorizontal: 5,flexDirection: "row" }}>{location.imageDescription}</Text>
      <View style={{ flexDirection: "row", marginHorizontal: 5, flexWrap: "wrap" }}>
      <MappedBAdges allTags={location.activityTagsAsCsv ? location.activityTagsAsCsv.split(", ") : []}/>
      </View>
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
    backgroundColor: "#f18484",
    justifyContent: "center", //Centered vertically
  },
  tinyLogo: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
export default Card;
