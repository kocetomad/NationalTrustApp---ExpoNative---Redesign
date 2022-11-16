import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect,useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import MyMap from "../Mapview";
import Search from "./Search";
import SelectedCardScreen from "./SelectedCard";
import LoadingModal from "../LoadingModal";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import BottomSheetMain from "../BottomSheet";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation,getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Badge from "../Badge";

const Home = ({ route }) => {
  const [places, setVisiblePlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setAllLocations,settings } = route.params;
  return (
    <View style={{ flex: 1 }}>
      {/* <LoadingModal modalVisible={loading}/>  */}

      <MyMap
        settings={settings}
        places={places}
        setPlaces={setVisiblePlaces}
        setAllLocations={setAllLocations}
      />

      <BottomSheetMain
        loading={loading}
        setLoading={setLoading}
        setPlaces={setVisiblePlaces}
        places={places}
      />
    </View>
  );
};

function HomeScreen({ route }) {
  const { settings } = route.params;

  const Stack = createStackNavigator();
  const navigation = useNavigation();
  //const Stack = createStackNavigator();
  const [textSearchbar, textSearchbarChanged] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState(null);

  async function SearchbarUpdated(arr) {
    
      let newArray = arr.filter(function (el) {
        return el.title.toLowerCase().includes(textSearchbar.toLowerCase());
      });
      return newArray;
    
      
    
  }
  useEffect(() => {
    setFilteredLocations(allLocations);
  }, [allLocations]);

  useEffect(() => {
    console.log(textSearchbar);
    SearchbarUpdated(allLocations)
      .then((data) => setFilteredLocations(data))
      .then(() => {
        navigation.navigate("Search", { locs: filteredLocations });
      })
      .catch(console.error);
  }, [textSearchbar]);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log("name: "+routeName)
    if (routeName === "Location detials"){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }else {
      navigation.setOptions({tabBarStyle: {display:'flex'}});
    }
}, [navigation, route]);
  return (
    <Stack.Navigator id="nav">
      <Stack.Screen
        id="Home"
        name="Home"
        component={Home}
        initialParams={{ setAllLocations: setAllLocations, settings:settings }}
        options={{
          
          headerTitle: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search", { locs: filteredLocations });
                console.log("press");
              }}
              style={{
                
                alignSelf: "center"
              }}
            >
              <View style={sheetStyle.browse} placeholder="Where to?">
                <Image
                  style={sheetStyle.tinyLogo}
                  source={require("../../assets/trust.png")}
                />
                <Text
                  style={{
                    position: "absolute",
                    left: 50,
                    top: 8,
                    fontSize: 16,
                  }}
                >
                  Browse all locations
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    left: 37,
                    top: 8,
                    fontSize: 18,
                    color: "#3c775b",
                  }}

                >
                  │
                </Text>
                <Icon
                  style={{ position: "absolute", right: 7, top: 5 }}
                  name="search"
                  size={25}
                  color="#3c775b"
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Group id="modalGroup" screenOptions={{ presentation: "card" }}>
        <Stack.Screen name="Location detials" component={SelectedCardScreen} />
        <Stack.Screen
          id="Search"
          name="Search"
          component={Search}
          options={{
            headerTitle: () => (
              <TextInput
                style={sheetStyle.input}
                onChangeText={textSearchbarChanged}
                placeholder="Where to?"
                value={textSearchbar}
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigation.navigate("Search", {
                    locs: allLocations,
                  });
                  console.log("press");
                }}
                style={{
                  marginRight: 20,
                }}
              >
                <Icon name="search" size={25} color="#3c775b" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
const windowWidth = Dimensions.get("window").width;

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
  input: {
    width: windowWidth - windowWidth * 0.32,
    borderBottomWidth: 2,
  },
  browse: {
    width: windowWidth - 30,
    borderWidth: 0,
    height: 40,
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    borderRadius: 15,
    shadowColor: "black",
    backgroundColor: "white",

  },
  tinyLogo: {
    width: 30,
    height: 30,
    position: "absolute",
                    left: 8,
                    top: 5,
                    borderRightWidth:1,
      
                    
  },
});
export default HomeScreen;
