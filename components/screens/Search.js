import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Badge from "../Badge";
const all = require("../../assets/all-places.json");

const MappedBAdges = ({ allTags }) => {
  return allTags.map((tag) =>
    tag == "Cycling" ? (
      <View key={tag} style={styles.card}>
      <Text key={tag} style={{ fontSize: 18 }}>
        Cycling🚴
      </Text>
      </View>
    ) : tag == "Walking" ? (
      <View key={tag} style={styles.card}>

      <Text key={tag} style={{ fontSize: 18 }}>
        Walking🚶
      </Text>
      </View>

    ) : tag == "Surfing" ? (
      <View key={tag} style={styles.card}>

      <Text key={tag} style={{ fontSize: 18 }}>
        Surfing🏄
      </Text>
      </View>

    ) : tag == "Horse riding" ? (
      <View key={tag} style={styles.card}>

      <Text key={tag} style={{ fontSize: 18 }}>
        Horse riding🏇
      </Text>
      </View>

    ) : (
      <View key={tag} style={styles.card}>

      <Text key={tag} style={{ fontSize: 18 }}>{tag}</Text>
      </View>

    )
  );
};

const Item = ({ title, allTags }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <View style={{ flexDirection: "row", flexWrap:"wrap" }}>
      {allTags.length > 0 ? "" : ""}
      <MappedBAdges allTags={allTags} />
    </View>
  </View>
);

const Search = ({ route }) => {
  const navigation = useNavigation();
  const { locs } = route.params;
  const [loactions, setLoactions] = useState(null);
  let marks = [];

  useEffect(() => {
    (async () => {
      let mapMarkers = [];

      for (let obj in all) {
        mapMarkers.push(all[obj]);
      }
      return mapMarkers;
    })()
      .then((data) => {
        setLoactions(data);
        marks = data;
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (locs != null) {
      if (locs.length > 0) {
        setLoactions(locs);
      } else {
        setLoactions(marks);
      }
    }
  }, [locs]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        navigation.navigate("Location detials", { loc: item });
      }}
    >
      <Item
        title={item.title}
        allTags={
          item.activityTagsAsCsv ? item.activityTagsAsCsv.split(", ") : []
        }
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={loactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#3c775b",
    paddingHorizontal: 20,
    paddingVertical: 10,

    marginVertical: 8,
    marginHorizontal: 16,
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    borderRadius: 15,
    shadowColor: "black",
  },
  title: {
    fontSize: 25,
    color: "white",
  },
  card: {
    shadowColor: "black",
    shadowRadius: 6,
    shadowOpacity: 0.40,
    padding:5,
    marginRight: 5,
    elevation: 10,
    borderRadius: 10,
    borderColor: "black",
    marginBottom: 10,
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "#3c775b",
    borderWidth: 1, //Centered vertically
  },
});

export default Search;
