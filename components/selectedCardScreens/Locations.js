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
        <Text>
          Full address: {postal_address_country}, {postal_address_county},{" "}
          {postal_address_town}, {postal_address_lines}, {postal_address_postcode}
        </Text>
        <Button
          title="Click To Open Maps 🗺"
          onPress={() => openMap({ end: postal_address_postcode })}
        />
        </View>
        <MapDirections directions={directions} />
      </ScrollView>
    );
  };

  const MapDirections = ({ directions }) => {
    return directions.map((dir) => (
      <View style={styles.card}>
        <Text style={styles.title}>{dir.category.charAt(0).toUpperCase() + dir.category.slice(1)}:</Text>
        {dir.description.length > 0 ? <Text>{dir.description}</Text> : ""}
        {dir.category == "cycle" ? (
          <OpenURLButton url={dir.cycle_route_url}>
            View cycling route
          </OpenURLButton>
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
      borderRadius: 10,
      marginBottom: 10,
      marginHorizontal: 10,
      padding: 20,
      marginTop: 15,
      alignSelf: "center",
      height: "auto",
      width: "90%",
      backgroundColor: "white",
      justifyContent: "center", //Centered vertically
    },
    title:
    {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 8,
      backgroundColor: "white",
      borderRadius: 10,
      marginBottom: 7,
      padding: 20,
      paddingVertical: 10,
      marginTop: -10,
      fontSize: 20,
      color: "white",
      alignSelf: "center",
      height: "auto",
      width: "100%",
      backgroundColor: "#3c775b",
      justifyContent: "center", //Centered vertically
    }
  });