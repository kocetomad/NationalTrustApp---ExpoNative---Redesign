import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Card from "../CardView";
import MyMap from "../Mapview";
import Notifications from "../HelloWorld";
import { View, Text } from "react-native";
import BottomSheetMain from "../BottomSheet";

function HomeScreen() {
  const [places, setVisiblePlaces] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <MyMap setPlaces={setVisiblePlaces} />
      <BottomSheetMain setPlaces={setVisiblePlaces} places={places} />
    </View>
  );
}
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
export default HomeScreen;
