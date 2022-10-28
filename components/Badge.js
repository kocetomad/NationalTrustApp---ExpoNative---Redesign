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
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.40,
    padding:10,
    marginRight: 5,
    elevation: 10,
    borderRadius: 10,
    borderColor: "black",
    marginBottom: 10,
    backgroundColor: "#f18484",
    justifyContent: "center", //Centered vertically
  },
  tinyLogo: {
    flex: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "black",
  },
});
export default Badge;
