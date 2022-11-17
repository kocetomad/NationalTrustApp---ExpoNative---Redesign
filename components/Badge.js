import React from "react";
import { View, StyleSheet, Text } from "react-native";
const Badge = ({ name }) => {
  return (
    <View style={styles.card}>
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowRadius: 6,
    shadowOpacity: 0.4,
    padding: 10,
    marginRight: 5,
    elevation: 10,
    borderRadius: 10,
    borderColor: "black",
    marginBottom: 10,
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "#3c775b",
    borderWidth: 1, //Centered vertically
  },
  tinyLogo: {
    flex: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
export default Badge;
