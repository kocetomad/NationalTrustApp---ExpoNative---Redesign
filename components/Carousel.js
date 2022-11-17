import * as React from "react";
import { Dimensions, Text, View, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";

function PlaceCarousel({ pics }) {
  const width = Dimensions.get("window").width;
  return (
    <View style={{}}>
      <Carousel
        loop
        width={width}
        height={width * 0.75}
        autoPlay={true}
        data={pics}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: "100%", height: undefined, aspectRatio: 1 }}
              source={{
                uri: pics[index],
              }}
            />
            {/* <Text>{pics[index]}</Text> */}
          </View>
        )}
      />
    </View>
  );
}

export default PlaceCarousel;
