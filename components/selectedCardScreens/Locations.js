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
        <Text>{details.contact_email}</Text>
        <Text>
          Full address: {postal_address_country}, {postal_address_county},{" "}
          {postal_address_town}, {postal_address_lines}, {postal_address_postcode}
        </Text>
        <Button
          title="Click To Open Maps 🗺"
          onPress={() => openMap({ end: postal_address_postcode })}
        />
        <MapDirections directions={directions} />
      </ScrollView>
    );
  };

  const MapDirections = ({ directions }) => {
    return directions.map((dir) => (
      <View style={{}}>
        <Text>{dir.category}</Text>
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