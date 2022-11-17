import React, { Component, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";

//Table component for displaying oppening hours
export const DateTable = ({ schedule }) => {
  const {
    mon_description,
    mon_start,
    mon_end,
    tue_description,
    tue_start,
    tue_end,
    wed_description,
    wed_start,
    wed_end,
    thu_description,
    thu_start,
    thu_end,
    fri_description,
    fri_start,
    fri_end,
    sat_description,
    sat_start,
    sat_end,
    sun_description,
    sun_start,
    sun_end,
  } = schedule;

  //Pardon the manual formatting
  const formatted_mon_description =
    mon_description.length > 1 ? mon_description : "N/A";
  const formatted_mon_start = mon_start.length > 1 ? mon_start : "N/A";
  const formatted_mon_end = mon_end.length > 1 ? mon_end : "N/A";
  const formatted_tue_description =
    tue_description.length > 1 ? tue_description : "N/A";
  const formatted_tue_start = tue_start.length > 1 ? tue_start : "N/A";
  const formatted_tue_end = tue_end.length > 1 ? tue_end : "N/A";
  const formatted_wed_description =
    wed_description.length > 1 ? wed_description : "N/A";
  const formatted_wed_start = wed_start.length > 1 ? wed_start : "N/A";
  const formatted_wed_end = wed_end.length > 1 ? wed_end : "N/A";
  const formatted_thu_description =
    thu_description.length > 1 ? thu_description : "N/A";
  const formatted_thu_start = thu_start.length > 1 ? thu_start : "N/A";
  const formatted_thu_end = thu_end.length > 1 ? thu_end : "N/A";
  const formatted_fri_description =
    fri_description.length > 1 ? fri_description : "N/A";
  const formatted_fri_start = fri_start.length > 1 ? fri_start : "N/A";
  const formatted_fri_end = fri_end.length > 1 ? fri_end : "N/A";
  const formatted_sat_description =
    sat_description.length > 1 ? sat_description : "N/A";
  const formatted_sat_start = sat_start.length > 1 ? sat_start : "N/A";
  const formatted_sat_end = sat_end.length > 1 ? sat_end : "N/A";
  const formatted_sun_description =
    sun_description.length > 1 ? sun_description : "N/A";
  const formatted_sun_start = sun_start.length > 1 ? sun_start : "N/A";
  const formatted_sun_end = sun_end.length > 1 ? sun_end : "N/A";

  let date = {
    tableHead: ["Day", "Note", "Oppening", "Closing"],
    tableTitle: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    tableData: [
      [formatted_mon_description, formatted_mon_start, formatted_mon_end],
      [formatted_tue_description, formatted_tue_start, formatted_tue_end],
      [formatted_wed_description, formatted_wed_start, formatted_wed_end],
      [formatted_thu_description, formatted_thu_start, formatted_thu_end],
      [formatted_fri_description, formatted_fri_start, formatted_fri_end],
      [formatted_sat_description, formatted_sat_start, formatted_sat_end],
      [formatted_sun_description, formatted_sun_start, formatted_sun_end],
    ],
  };

  const windowWidth = Dimensions.get("window").width;
  return (
    <Table borderStyle={{}}>
      <Row
        data={date.tableHead}
        flexArr={[1, 2, 1, 1]}
        style={{
          height: 40,
          backgroundColor: "#f1f8ff",
          width: windowWidth - windowWidth * 0.15,
          alignSelf: "center",
          borderBottomWidth: 1,
        }}
        textStyle={styles.text}
      />
      <TableWrapper
        style={{
          flexDirection: "row",
          width: windowWidth - windowWidth * 0.15,
          alignSelf: "center",
        }}
      >
        <Col
          data={date.tableTitle}
          style={styles.title}
          heightArr={[28, 28]}
          textStyle={styles.text}
        />
        <Rows
          data={date.tableData}
          flexArr={[2, 1, 1]}
          style={styles.row}
          textStyle={styles.text}
        />
      </TableWrapper>
    </Table>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 28, borderBottomWidth: 1 },
  text: { textAlign: "center", fontSize: 10 },
});
