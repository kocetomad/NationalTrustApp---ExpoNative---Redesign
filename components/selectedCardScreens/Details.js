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

export const Details = ({ route }) => {
    const { details } = route.params;
    var htmlString = details.description_html;
    var plainString = fixHtmlString(htmlString);
    return (
      <View style={{ flex: 1 }}>
        <Text>{plainString}</Text>
      </View>
    );
  };