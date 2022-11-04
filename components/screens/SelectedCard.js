import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Dimensions, View, Text, Image } from "react-native";
import PlaceCarousel from "../Carousel";

//Location details from the decompiled app
const locationDetails = require("../../assets/places.json");
const locationDirections = require("../../assets/directions.json");
const locationPictures = require("../../assets/places_images.json");

const SelectedCardScreen = ({ route, navigation }) => {
  const [placeDetails, setPlaceDetails] = useState([]);
  const { loc } = route.params;
  const details = locationDetails.find((element) => element.id == loc.id);
  var placesPics = locationPictures.filter(function (el) {
    return el.place_id == loc.id;
  });
  placesPics = placesPics.map((pic) => (
    "../assets/"+pic.image_id.substring(11)+".jpg"
  ))
  useEffect(() => {
    
    setPlaceDetails(placesPics);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PlaceCarousel pics={placesPics} />
      <Text>{placesPics[1]}</Text>
      <Text>{details.contact_email}</Text>
      <Text>{loc.title}</Text>
      <Text>{loc.cmsRegion}</Text>
      <Text>{loc.subTitle}</Text>
    </View>
  );
};

export default SelectedCardScreen;
