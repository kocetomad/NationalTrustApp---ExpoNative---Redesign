import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import Card from "./CardView";

const BottomSheetMain = ({setPlaces,places}) => {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["9%", "100%"],[]);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  // renders
  const MapScopedLocs = ({locs}) => {
    //console.log("state ", state)
    return locs.map((loc) => (
      <Card
        // key={loc.id}
        // coordinate={{
        //   latitude: loc.location.latitude,
        //   longitude: loc.location.longitude,
        // }}
        // title={loc.title}
        // description={loc.description}
      ></Card>
    ));
  };
  return (
      <BottomSheet
        ref={bottomSheetRef}
        setPlaces
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={sheetStyle.contentContainer}>
          <Text>{places.length} National trust locations in this area 🎉</Text>
        </View>
        <BottomSheetScrollView contentContainerStyle={sheetStyle.ScrollView}>
          <MapScopedLocs locs={places}/>
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


