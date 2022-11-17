import {
  Dimensions,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";
const { width } = Dimensions.get("window");
import { replaceAll, fixHtmlString, OpenURLButton } from "../Util";
import { DateTable } from "../DateTable";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { compareAsc, format } from "date-fns";
import { useState } from "react";

const locationDetails = require("../../assets/places.json");
const locationDirections = require("../../assets/directions.json");
const locationPictures = require("../../assets/places_images.json");
const locationAdmissions = require("../../assets/admission_prices.json");
const locationOppeningTimePattern = require("../../assets/opening_times_patterns.json");
const locationOppeningTimeWeeks = require("../../assets/opening_times_weeks.json");
const locationOppeningLabels = require("../../assets/opening_times_labels.json");


//Defines the layout for the working time tab inside the details view
export const WorkingTime = ({ route }) => {
  const { details, directions, admissions, workingTime } = route.params;
  var htmlString = details.description_html;
  var plainString = fixHtmlString(htmlString);

  let workingWeeks = locationOppeningTimeWeeks.filter(function (el) {
    return el.place_id == details.id;
  });
  workingWeeks = workingWeeks.map((week) => week.week_start);
  workingWeeks.sort();
  workingWeeks = workingWeeks.map(
    (week) =>
      week.substring(0, 4) +
      "/" +
      week.substring(4, 6) +
      "/" +
      week.substring(6, 8)
  );
  workingWeeks = [...new Set(workingWeeks)];
  const [labelSchedule, setLabelSchedule] = useState(
    getLabelSchdulePair(new Date(), details.id, false)
  );


  return (
    <ScrollView style={{ flex: 1 }}>
      <SelectDropdown
        data={workingWeeks}
        // defaultValueByIndex={1}
        // defaultValue={'England'}
        onSelect={(selectedItem, index) => {
          getLabelSchdulePair(
            new Date(selectedItem),
            details.id,
            setLabelSchedule
          );
        }}
        defaultButtonText={"Select a working week"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.dropdown2BtnStyle}
        buttonTextStyle={styles.dropdown2BtnTxtStyle}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#FFF"}
              size={18}
            />
          );
        }}
        dropdownIconPosition={"right"}
        dropdownStyle={styles.dropdown2DropdownStyle}
        rowStyle={styles.dropdown2RowStyle}
        rowTextStyle={styles.dropdown2RowTxtStyle}
      />
      <MapWorkingTime admissions={admissions} workingTime={labelSchedule} />
    </ScrollView>
  );
};

const MapWorkingTime = ({ admissions, workingTime }) => {
  const windowWidth = Dimensions.get("window").width;

  return workingTime.map((wt,index) => (
    <View
      key={index}
      style={{
        marginTop: 10,
        elevation: 8,
        shadowColor: "black",
        shadowRadius: 6,
        shadowOpacity: 0.26,
      }}
    >
      {wt.label ? (
        <Text
          style={{
            alignSelf: "center",
            backgroundColor: "#3c775b",
            width: windowWidth - windowWidth * 0.15,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            textAlign: "center",
            fontSize: 20,
            paddingVertical: 5,
            color: "white",
          }}
        >
          {wt.label.label}
        </Text>
      ) : (
        ""
      )}
      <DateTable schedule={wt.schedule} />
    </View>
  ));
};

function getLabelSchdulePair(date, id, setLabelSchedule) {
  const labelScheduleList = [];
  const d = date;
  const locOTWekks = locationOppeningTimeWeeks.filter(function (el) {
    return el.place_id == id && el.week_start == format(d, "yyyyMMdd");
  });
  locOTWekks.forEach((element) => {
    let labelSchedulePair = {
      label: locationOppeningLabels.find((ele) => ele.lid == element.label_id),
      schedule: locationOppeningTimePattern.find(
        (ele) => ele._id == element.pattern_id
      ),
    };
    labelScheduleList.push(labelSchedulePair);
  });
  if (setLabelSchedule == false) {
    return labelScheduleList;
  } else {
    setLabelSchedule(labelScheduleList);
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    width,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  headerTitle: { color: "#000", fontWeight: "bold", fontSize: 16 },
  viewContainer: { flex: 1, width, backgroundColor: "#FFF" },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "10%",
    paddingBottom: "20%",
  },

  dropdown2BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: {
    backgroundColor: "#444",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
  dropdown2RowTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
