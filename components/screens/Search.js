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

const MappedBAdges = ({ allTags }) => {
  return allTags.map((tag) =>
    tag == "Cycling" ? <Text style={{fontSize: 30,}}>🚴</Text> : tag == "Walking" ? <Text style={{fontSize: 30,}}>🚶‍♂️</Text> : tag == "Surfing" ? <Text style={{fontSize: 30,}}>🏄‍♂️</Text> : tag == "Horse riding" ? <Text style={{fontSize: 30,}}>🏇</Text> : ""
  );
};

const Item = ({ title, allTags }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <View style={{flexDirection:"row"}}>{allTags.length > 0 ? <Text>activities:</Text> : ""}<MappedBAdges allTags={allTags} /></View>
  </View>
);

const Search = ({ route }) => {
  const navigation = useNavigation();
  const { locs } = route.params;
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <Text>{locs.length}</Text>
  //     </View>
  //   );
  const renderItem = ({ item }) => (
    <TouchableOpacity
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
        data={locs}
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    borderRadius: 15,
    shadowColor: "black",
  },
  title: {
    fontSize: 32,
  },
});

export default Search;
