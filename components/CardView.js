import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
const Card = (props, { title, image, desc }) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <Text style= {{flex:1,justifyContent:"flex-start"}} >Title</Text>
      <Text style= {{flex:1}} >desc</Text>
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
    borderRadius: 10,
    marginBottom: 10,
    height: 300,
    width: "90%",
    backgroundColor: "#f18484",
    justifyContent: "center", //Centered vertically
  },
  tinyLogo: {
    flex: 3,
    width: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10

  },
});
export default Card;
