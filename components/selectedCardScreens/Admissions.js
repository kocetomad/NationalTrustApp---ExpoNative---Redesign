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
      <View style={{}}>
        <Text>
          {add.name} - {add.category}
        </Text>
        <Text>
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