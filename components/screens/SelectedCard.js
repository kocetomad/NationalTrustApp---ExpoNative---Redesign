import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
} from "react-native";
import PlaceCarousel from "../Carousel";
import Ionicons from "react-native-vector-icons/Ionicons";
import { compareAsc, format } from "date-fns";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Details } from "../selectedCardScreens/Details";
import { Admissions } from "../selectedCardScreens/Admissions";
import { Location } from "../selectedCardScreens/Locations";
import { WorkingTime } from "../selectedCardScreens/WorkingTime";
import { useNavigation } from "@react-navigation/native";

const locationDetails = require("../../assets/places.json");
const locationDirections = require("../../assets/directions.json");
const locationPictures = require("../../assets/places_images.json");
const locationAdmissions = require("../../assets/admission_prices.json");
const locationOppeningTimePattern = require("../../assets/opening_times_patterns.json");
const locationOppeningTimeWeeks = require("../../assets/opening_times_weeks.json");
const locationOppeningLabels = require("../../assets/opening_times_labels.json");

const Tab = createMaterialTopTabNavigator();
function TopTabNav({ details, directions, admissions, workingTime }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Details") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Directions") {
            iconName = focused ? "compass-outline" : "compass";
          } else if (route.name === "Admissions") {
            iconName = focused ? "cash-outline" : "cash";
          } else if (route.name === "Working time") {
            iconName = focused ? "alarm-outline" : "alarm";
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
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
      <Tab.Screen
        name="Admissions"
        initialParams={{
          details: details,
          directions: directions,
          admissions: admissions,
        }}
        component={Admissions}
      />
      <Tab.Screen
        name="Working time"
        initialParams={{
          details: details,
          directions: directions,
          admissions: admissions,
          workingTime: workingTime

        }}
        component={WorkingTime}
      />
    </Tab.Navigator>
  );
}

const SelectedCardScreen = ({ route, navigation }) => {
  const [placeDetails, setPlaceDetails] = useState([]);
  const { loc } = route.params;
  const nav = useNavigation();

  const admissions = locationAdmissions.filter(function (el) {
    return el.place_id == loc.id;
  });
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

  const locOTWekks = locationOppeningTimeWeeks.filter(function (el) {
    return el.place_id == loc.id;
  });
  var now = new Date();
  const labelScheduleList = []

  useEffect(() => {
    //finding the start of the current week as per the decompiled dataset format

    nav.setOptions({ title: loc.title })
    const d = new Date("2022/05/30");
    let day = d.getDay() - 1;
    d.setDate(d.getDate() - day);
    const locOTWekks = locationOppeningTimeWeeks.filter(function (el) {
      return el.place_id == loc.id && el.week_start == format(d, "yyyyMMdd");
    });
    locOTWekks.forEach(element => {
      let labelSchedulePair = {
        label : locationOppeningLabels.find((ele) => ele.lid == element.label_id),
        schedule : locationOppeningTimePattern.find((ele) => ele._id == element.pattern_id)
      }
      labelScheduleList.push(labelSchedulePair);
    });
    setPlaceDetails(placesPics);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PlaceCarousel pics={placesPics} />
      <TopTabNav
        details={details}
        directions={directions}
        admissions={admissions}
        workingTime={labelScheduleList}
      />
    </View>
  );
};

export default SelectedCardScreen;
