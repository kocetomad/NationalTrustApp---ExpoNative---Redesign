import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { compareAsc, format } from "date-fns";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import openMap from "react-native-open-maps";
import { Marker, Polygon } from "react-native-maps";


export const getBoundByRegion = (region, scale = 1) => {
  /*
   * Latitude : max/min +90 to -90
   * Longitude : max/min +180 to -180
   */
  // Of course we can do it mo compact but it wait is more obvious
  const calcMinLatByOffset = (lng, offset) => {
    const factValue = lng - offset;
    if (factValue < -90) {
      return (90 + offset) * -1;
    }
    return factValue;
  };

  const calcMaxLatByOffset = (lng, offset) => {
    const factValue = lng + offset;
    if (90 < factValue) {
      return (90 - offset) * -1;
    }
    return factValue;
  };

  const calcMinLngByOffset = (lng, offset) => {
    const factValue = lng - offset;
    if (factValue < -180) {
      return (180 + offset) * -1;
    }
    return factValue;
  };

  const calcMaxLngByOffset = (lng, offset) => {
    const factValue = lng + offset;
    if (180 < factValue) {
      return (180 - offset) * -1;
    }
    return factValue;
  };

  const latOffset = (region.latitudeDelta / 2) * scale;
  const lngD =
    region.longitudeDelta < -180
      ? 360 + region.longitudeDelta
      : region.longitudeDelta;
  const lngOffset = (lngD / 2) * scale;

  return {
    minLng: calcMinLngByOffset(region.longitude, lngOffset), // westLng - min lng
    minLat: calcMinLatByOffset(region.latitude, latOffset), // southLat - min lat
    maxLng: calcMaxLngByOffset(region.longitude, lngOffset), // eastLng - max lng
    maxLat: calcMaxLatByOffset(region.latitude, latOffset), // northLat - max lat
  };
};

export function CSVToArray(stringVal, splitter) {
  const [keys, ...rest] = stringVal
    .trim()
    .split("\n")
    .map((item) => item.split(splitter));

  const formedArr = rest.map((item) => {
    const object = {};
    keys.forEach((key, index) => (object[key] = item.at(index)));
    return object;
  });
  return formedArr;
}

export function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

export function fixHtmlString(htmlString) {
  var plainString = htmlString.replace(/<[^>]+>/g, "");
  plainString = replaceAll(plainString, "&#39;", "");
  plainString = replaceAll(plainString, "&nbsp;", "");
  plainString = replaceAll(plainString, "&rsquo;", "");
  return plainString;
}

export const OpenURLButton = ({ url, children }) => {
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

const geoJSON = {
  type: "Feature",
  properties: {
    OBJECTID: 810,
    ID: 989157.0,
    Name: "Hamps and Manifold Valleys",
    LastUpdated: "2016-12-20T15:39:17Z",
    SHAPE_Length: 0.022841010737555355,
    SHAPE_Area: 1.0869688578001811e-5,
  },
  geometry: {
    type: "MultiPolygon",
    coordinates: [
      [
        [
          [-1.862395374999949, 53.101717695000048],
          [-1.861569740999926, 53.101509604000057],
          [-1.859642856999926, 53.101258702000052],
          [-1.860744771999975, 53.101135707000026],
          [-1.864186833999952, 53.101263949000042],
          [-1.865494206999927, 53.101514083000041],
          [-1.86673314199993, 53.101639753000029],
          [-1.867423040999938, 53.101184725000053],
          [-1.868044595999947, 53.100563817000079],
          [-1.870315552999955, 53.100897812000028],
          [-1.86969339999996, 53.101725870000053],
          [-1.86914106699993, 53.102222490000031],
          [-1.867969292999931, 53.102677087000075],
          [-1.867073882999932, 53.102758950000066],
          [-1.865627882999945, 53.102798762000077],
          [-1.865077303999954, 53.102715286000034],
          [-1.863701050999964, 53.102506497000036],
          [-1.863150741999959, 53.102340157000071],
          [-1.862806820999936, 53.102215390000026],
          [-1.862395374999949, 53.101717695000048],
        ],
      ],
    ],
  },
};
const alwaysOpen = require("../assets/National_Trust_Open_Data _Land_-_Always_Open.json");

export const polygon = (loc) =>{
  let out=loc.geometry.coordinates[0][0].map((coordsArr) => {
      let coords = {
        latitude: coordsArr[1],
        longitude: coordsArr[0],
      };
      return coords;
    });
    return out;
}


  export const MapGeoJson = ({zonesEnabled}) => {
    //console.log("state ", state)
    if (zonesEnabled == true){
      return alwaysOpen.features.map((geo) => (
        <Polygon
      coordinates={ polygon(geo)} 
      fillColor='rgba(30, 238, 23, 0.52)'/>
      ));
    }else{
      return ""
    }
    // test = []
    // test1 = alwaysOpen.features.map((geo) => polygon(geo));
    // console.log(test1)
  };
