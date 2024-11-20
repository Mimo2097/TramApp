import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {stations} from '../data';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Map = ({ navigation }) => {
  const [search, setSearch] = useState('');
  
  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill} provider={MapView.PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 49.6116,
        longitude: 6.1319,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        }}
        >
          {filteredStations.map((station) => (
          <Marker
          key={station.id}
          coordinate={{
            latitude: station.location.latitude,
            longitude: station.location.longitude,
          }}
          title={station.name}
        >
          <View>
            <Icon name="tram" size={30} color="blue" />
          </View>

        </Marker>
        ))}
      </MapView>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Hier suchen"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default Map;
