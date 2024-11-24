import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList,TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { stations } from '../data';

const Map = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isListVisible, setListVisible] = useState(false);
  
  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );
    
  const routeOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const routeCoordinates = routeOrder.map((id) => {
    const station = stations.find((s) => s.id === id);
    return {
      latitude: station.location.latitude,
      longitude: station.location.longitude,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date()); // Aktualisiere die aktuelle Zeit jede Minute
    }, 60000); 

    return () => clearInterval(interval); // Speicherlecks vermeiden
  }, []);

  const getNextDepartures = (departures) => {
    console.log('Aktuelle Zeit:', currentTime.toISOString());
    departures.forEach(departure => {
      console.log('Abfahrtszeit:', departure.departureTime, 'Differenz:', new Date(departure.departureTime) - currentTime);
    });

    const futureDepartures = departures
      .map((departure) => ({
        ...departure,
        timeDiff: new Date(departure.departureTime) - currentTime,
      }))
      .filter((departure) => departure.timeDiff > 0) // Nur zukünftige Abfahrten
      .sort((a, b) => a.timeDiff - b.timeDiff); // Nach Zeit sortieren

    return futureDepartures.slice(0, 1); // Zeige die nächste Abfahrt
  };

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
        {filteredStations.map((station) => {
          const nextDeparture = getNextDepartures(station.departures);
          return (
            <Marker
              key={station.id}
              coordinate={{
                latitude: station.location.latitude,
                longitude: station.location.longitude,
              }}
              title={station.name}
              description={
                nextDeparture.length > 0
                  ? `Nächste Abfahrt: Linie ${nextDeparture[0].line} um ${new Date(
                      nextDeparture[0].departureTime
                    ).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`
                  : 'Keine weiteren Abfahrten'
              }
              
            >
              <View>
                <Icon name="place" size={30} color="blue" />
              </View>
            </Marker>
          );
        })}
        
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#007BFF" // Linienfarbe
          strokeWidth={4} // Linienbreite
        />
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
