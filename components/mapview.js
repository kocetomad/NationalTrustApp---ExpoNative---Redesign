import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';

state = { locations: [] };

componentDidMount = () => {
  fetch('https://www.nationaltrust.org.uk/search/data/all-places')
    .then(res => res.json())
    .then(data => {
      this.setState({locations: data})

    })
    .catch(console.error)
}

mapMarkers = () => {
  return this.state.locations.map((loc) => <Marker
    key={loc.id}
    coordinate={{ latitude: report.location.latitude, longitude: report.longitude }}
    title={loc.title}
    description={loc.description}
  >
  </Marker >)
}

const myMap = () => {
  return (
    <MapView
  region={this.state.region}
  onRegionChange={this.onRegionChange}
>
  {this.state.locations.map((marker, index) => (
    <Marker
      key={index}
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))}
</MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default myMap;