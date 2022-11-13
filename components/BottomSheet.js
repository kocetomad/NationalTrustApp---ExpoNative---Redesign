import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import Card from "./CardView";

const BottomSheetMain = ({ setPlaces, places, setLoading,loading }) => {
  const bottomSheetRef = useRef(null);
  const [mapped, setMapped] = useState([]);
  // variables
  const snapPoints = useMemo(() => ["9%", "100%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handle sheet change");
  }, []);
  useEffect(() => {
    (async function () {
      var mapp = places.map((loc) => <Card location={loc}></Card>);
      return mapp;
    })().then((mapp) => {
      setMapped(mapp);
      console.log("finished loading")
    });
  
  }, [places]);

  // renders
  const MapScopedLocs = ({ locs }) => {
    useEffect(() => {
      //setLoading(false);
    }, []);
    return locs
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      setPlaces
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={sheetStyle.contentContainer}>
        <Text>{places.length} National trust locations in this area 🎉</Text>
      </View>
      <BottomSheetScrollView contentContainerStyle={sheetStyle.ScrollView}>
        <MapScopedLocs locs={mapped} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const sheetStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 0.15,
    alignItems: "center",
  },
  ScrollView: {
    alignItems: "center",
  },
});

export default BottomSheetMain;
