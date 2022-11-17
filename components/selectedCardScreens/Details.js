import {
  Dimensions,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  Linking,
  StyleSheet,
  Alert,
} from "react-native";
import { replaceAll, fixHtmlString, OpenURLButton } from "../Util";

export const Details = ({ route }) => {
  const { details } = route.params;
  var htmlString = details.description_html;
  var plainString = fixHtmlString(htmlString);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>Description:</Text>

          <Text style={{ padding: 20, fontSize: 16 }}>{plainString}</Text>
        </View>
      </ScrollView>
    </View>
  );
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
    padding: 20,
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
