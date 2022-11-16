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

export const Admissions = ({ route }) => {
  const { details, directions, admissions } = route.params;
  var htmlString = details.description_html;
  var plainString = fixHtmlString(htmlString);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <MapAddmissions admissions={admissions} />
      </ScrollView>
    </View>
  );
};

const MapAddmissions = ({ admissions }) => {
  return admissions.map((add) => (
    <View key={add.name} style={styles.card}>
      <Text style={styles.title}>
        {add.name} - {add.category}
      </Text>
      <Text style={{ fontSize: 20 }}>
        Standard price: {add.standard_amount} {add.standard_currency}
      </Text>
      {add.gift_aid_currency.length > 0 ? (
        <Text>
          Gid aid price: {add.gift_aid_amount} {add.gift_aid_currency}
        </Text>
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
    marginBottom: 1,
    marginHorizontal: 10,
    padding: 20,
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
  },
});
