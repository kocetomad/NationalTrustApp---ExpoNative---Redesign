import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Dimensions,View, Text } from "react-native";
import PlaceCarousel from "../Carousel";

//Location details from the decompiled app
const locationDetails = require('../../assets/National Trust Assets/places.json');
const locationDirections = require('../../assets/National Trust Assets/directions.json');
const locationPictures = require('../../assets/National Trust Assets/places_images.json');


const SelectedCardScreen = ({ route, navigation }) => {
  const [places, setVisiblePlaces] = useState([]);
  const { loc } = route.params;


  useEffect(() => {
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PlaceCarousel/>
      <Text>{loc.title}</Text>
      <Text>{loc.cmsRegion}</Text>
      <Text>{loc.subTitle}</Text>
    </View>
  );
};

export default SelectedCardScreen;
