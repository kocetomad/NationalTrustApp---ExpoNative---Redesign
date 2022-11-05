import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Dimensions, View, Text, Image,Button,ScrollView,Linking,Alert } from "react-native";
import PlaceCarousel from "../Carousel";

import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
const locationDetails = require("../../assets/places.json");
const locationDirections = require("../../assets/directions.json");
const locationPictures = require("../../assets/places_images.json");
import { replaceAll, fixHtmlString } from "../Util";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import openMap from 'react-native-open-maps';

const Tab = createMaterialTopTabNavigator();
function TopTabNav({ details, directions }) {
  
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Details"
        initialParams={{ details: details }}
        component={Details}
      />
      <Tab.Screen
        name="Directions"
        initialParams={{ details: details, directions: directions }}
        component={Location}
      />
    </Tab.Navigator>
  );
}

const Details = ({ route }) => {
  const { details } = route.params;
  var htmlString = details.description_html;
  var plainString = fixHtmlString(htmlString);
  return (
    <View style={{ flex: 1 }}>
      <Text>{plainString}</Text>
    </View>
  );
};

const Location = ({ route }) => {
  const { details,directions } = route.params;

  
  const {
    postal_address_country,
    postal_address_county,
    postal_address_lines,
    postal_address_postcode,
    postal_address_town,
  } = details;
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>{details.contact_email}</Text>
      <Text>Full address: {postal_address_country}, {postal_address_county}, {postal_address_town}, {postal_address_lines}, {postal_address_postcode}</Text>
      <Button title="Click To Open Maps 🗺" onPress={() => openMap({end: postal_address_postcode })}/>
      <MapDirections directions={directions}/>
    </ScrollView>
  );
};

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};


const MapDirections = ({directions}) => {

  return directions.map((dir) => (
    <View style={{}}>
      <Text>{dir.category}</Text>
      {dir.description.length > 0 ? <Text>{dir.description}</Text> : ""}
      {dir.category == "cycle" ? <OpenURLButton url={dir.cycle_route_url}>View cycling route</OpenURLButton> : ""}
    </View>
  ));
};


const SelectedCardScreen = ({ route, navigation }) => {
  const [placeDetails, setPlaceDetails] = useState([]);
  const { loc } = route.params;
  const details = locationDetails.find((element) => element.id == loc.id);
  const directions = locationDirections.filter(function (el) {
    return el.place_id == loc.id;
  });
  var placesPics = locationPictures.filter(function (el) {
    return el.place_id == loc.id;
  });
  placesPics = placesPics.map(
    (pic) => "../assets/" + pic.image_id.substring(11) + ".jpg"
  );
  useEffect(() => {
    setPlaceDetails(placesPics);
  }, []);

  //Striping all premade formatting

  return (
    <View style={{ flex: 1 }}>
      <PlaceCarousel pics={placesPics} />
      <Text
        style={{
          justifyContent: "flex-start",
          fontWeight: "bold",
          fontSize: 30,
          marginHorizontal: 5,
        }}
      >
        {loc.title}
      </Text>

      <Text>Abaout the place:</Text>
      <Text>{details.name}</Text>
      <Text>{placesPics[1]}</Text>
      <TopTabNav details={details} directions={directions}/>
    </View>
  );
};

export default SelectedCardScreen;
