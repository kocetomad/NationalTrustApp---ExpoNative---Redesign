import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import Card from "./CardView";

const BottomSheetMain = ({
  setPlaces,
  places,
  setLoading,
  loading,
  bottomSheetState,
}) => {
  const bottomSheetRef = useRef(null);
  const [mapped, setMapped] = useState([]);
  // variables
  const snapPoints = useMemo(() => ["9%", "100%"], []);

  //expands bottom sheet if area filter butto nis pressed 
  useEffect(() => {
    if (
      bottomSheetState.text.includes(
        "National trust locations in the filtered area"
      )
    ) {
      bottomSheetRef.current.expand();
    }
  }, [bottomSheetState]);

  const handleSheetChanges = useCallback((index) => {
  }, []);
  //Maps cardviews if filter area is pressed
  useEffect(() => {
    (async function () {
      var mapp = places.map((loc, index) => (
        <Card key={index} location={loc}></Card>
      ));
      return mapp;
    })()
      .then((mapp) => {
        setMapped(mapp);
      })
      .catch(console.error);
  }, [places]);

  // renders
  const MapScopedLocs = ({ locs }) => {
    useEffect(() => {
      //setLoading(false);
    }, []);
    return locs;
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
        <Text>{bottomSheetState.text}</Text>
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
    flex: 0.1,
    alignItems: "center",
  },
  ScrollView: {
    alignItems: "center",
  },
});

export default BottomSheetMain;
