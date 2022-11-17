import {
  Dimensions,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { replaceAll, fixHtmlString, OpenURLButton } from "../Util";

//Defines the Directions for the Lcoation view inside the details screen
export const Location = ({ route }) => {
  const { details, directions } = route.params;

  const {
    postal_address_country,
    postal_address_county,
    postal_address_lines,
    postal_address_postcode,
    postal_address_town,
  } = details;
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.card}>
        <Text style={styles.title}>Address:</Text>
        <Text style={{ padding: 20, fontSize: 16 }}>
          Full address: {postal_address_country}, {postal_address_county},{" "}
          {postal_address_town}, {postal_address_lines},{" "}
          {postal_address_postcode}
        </Text>
        <View
          style={{ paddingHorizontal: 10, paddingBottom: 10, borderRadius: 10 }}
        >
          <Button
            style={{ borderRadius: 10 }}
            title="Click To Open Maps 🗺"
            onPress={() => openMap({ end: postal_address_postcode })}
          />
        </View>
      </View>
      <MapDirections directions={directions} />
    </ScrollView>
  );
};

const MapDirections = ({ directions }) => {
  return directions.map((dir) => (
    <View key={dir.category} style={styles.card}>
      <Text style={styles.title}>
        {dir.category.charAt(0).toUpperCase() + dir.category.slice(1)}:
      </Text>
      {dir.description.length > 0 ? (
        <Text style={{ padding: 20, fontSize: 16 }}>{dir.description}</Text>
      ) : (
        ""
      )}
      {dir.category == "cycle" ? (
        <View
          style={{ paddingHorizontal: 10, paddingBottom: 10, borderRadius: 10 }}
        >
          <OpenURLButton url={dir.cycle_route_url}>
            View cycling route
          </OpenURLButton>
        </View>
      ) : (
        ""
      )}
    </View>
  ));
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#3c775b",

    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 15,
    alignSelf: "center",
    height: "auto",
    width: "90%",
    backgroundColor: "white",
    justifyContent: "center", //Centered vertically
  },
  title: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    marginBottom: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    height: "auto",
    width: "100%",
    backgroundColor: "#3c775b",
    justifyContent: "center", //Centered vertically
  },
});
