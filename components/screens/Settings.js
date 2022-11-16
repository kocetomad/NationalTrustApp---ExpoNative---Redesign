import { View, Text } from "react-native";
import React, { useState,useEffect } from "react";
import { Switch, StyleSheet } from "react-native";

function Settings({ route }) {
  const { setSettings } = route.params;

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  useEffect(() => {
    setSettings(isEnabled)
    console.log(isEnabled)
  }, [isEnabled])
  
  return (
    <View style={{ flex: 1,}}>
      <View style={styles.container}>
      <Text style={{fontSize: 15}}>Toggle display of "Always Open" Nationa trust locations</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#107786" }}
          thumbColor={isEnabled ? "#3c775b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }], marginTop:5 }}
        />
        <View style={styles.card}>
        <Text style={{fontSize: 14}}>Please be aware that this feature is experimental and will heavily impact performence. The package being used to display the map cannot handle the large amount of polygons being drawn in order to represent the spaces occupied by the "Always open" national trust lcoations. It also takes around 20 seconds for all zones to load up.</Text>
      </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 20,
    marginTop: 15,
    alignSelf: "center",
    height: "auto",
    width: "90%",
    backgroundColor: "white",
    borderColor: "#d31145",
    borderWidth: 1,
  },
});

export default Settings;
