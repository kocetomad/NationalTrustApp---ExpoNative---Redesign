import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { View, Text } from "react-native";
import cheerio from "cheerio";
import htmlparser2 from "htmlparser2";

const SelectedCardScreen = ({ route, navigation }) => {
  const [places, setVisiblePlaces] = useState([]);
  const { loc } = route.params;
  cosnt [scraped, setScraped] = useState(null)


  useEffect(() => {
    fetch("https://www.nationaltrust.org.uk/place-pages/1/pages/opening-times-calendar")
      .then((response) => response.text())
      .then((data) => {
        const $ = cheerio.load(data);
        const list = $("#s-results-list-atf > li") // select result <li>s
          .map((_, li) => ({
            // map to an list of objects
            asin: $(li).data("asin"),
            title: $("h2", li).text(),
            price: $("span.a-color-price", li).text(),
            rating: $("span.a-icon-alt", li).text(),
            imageUrl: $("img.s-access-image").attr("src"),
          }));

        console.log(list);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log(scraped);
  }, [scraped]);


  return (
    <View style={{ flex: 1 }}>
      <Text>{loc.title}</Text>
      <Text>{loc.cmsRegion}</Text>
      <Text>{loc.subTitle}</Text>
    </View>
  );
};

export default SelectedCardScreen;
