import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { View, Text } from "react-native";
import cheerio from "cheerio";
import htmlparser2 from "htmlparser2";

const SelectedCardScreen = ({ route, navigation }) => {
  const [places, setVisiblePlaces] = useState([]);
  const { loc } = route.params;


  useEffect(() => {
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>{loc.title}</Text>
      <Text>{loc.cmsRegion}</Text>
      <Text>{loc.subTitle}</Text>
    </View>
  );
};

export default SelectedCardScreen;
