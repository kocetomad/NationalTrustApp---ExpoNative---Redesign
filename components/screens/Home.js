import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
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
} from "react-native";
import BottomSheetMain from "../BottomSheet";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Badge from "../Badge";

const Home = ({ route }) => {
  const [places, setVisiblePlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setAllLocations } = route.params;
  return (
    <View style={{ flex: 1,backgroundColor: 'red'}}>
      
      {/* <LoadingModal modalVisible={loading}/>  */}
      
      <MyMap
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

function HomeScreen() {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  //const Stack = createStackNavigator();
  const [textSearchbar, textSearchbarChanged] = React.useState("");
  const [allLocations, setAllLocations] = useState(null);
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
        console.log(filteredLocations.length);
      })
      .catch(console.error);
  }, [textSearchbar]);

  return (
    <Stack.Navigator id="nav">
      
        <Stack.Screen
          id="Home"
          name="Home"
          component={Home}
          initialParams={{ setAllLocations: setAllLocations }}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Search", { locs: filteredLocations });
                  console.log("press");
                }}
                style={{
                  marginRight: 20,
                }}
              >
                <Icon name="search" size={25} color="#4F8EF7" />
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
                <Icon name="search" size={25} color="#4F8EF7" />
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
});
export default HomeScreen;
