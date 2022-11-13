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

const Card = ({ location }) => {
  const MappedBAdges = ({ allTags }) => {
    return allTags.map((tag) => <Badge name={tag}></Badge>);
  };

  const navigation = useNavigation();
  return (
    <View style={{ ...styles.card }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Location detials",{loc: location});
          title = "Open Modal";
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
          }}
        >
          {location.title}
        </Text>
        <Text style={{ marginHorizontal: 5, flexDirection: "row" }}>
          {location.imageDescription}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 5,
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
