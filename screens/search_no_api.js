import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { stations } from '../data'; // Importiere deine Stationsdaten

const SearchNoApi = () => {
  const [search, setSearch] = useState(''); // Suchtext
  const [filteredStations, setFilteredStations] = useState(stations); // Gefilterte Stationen
  const [selectedStation, setSelectedStation] = useState(null);

  // Filterfunktion
  const filterStations = (text) => {
    setSearch(text); // Aktualisiere den Suchtext
    if (text) {
      const filtered = stations.filter((station) =>
        station.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredStations(filtered); // Speichere die gefilterten Stationen
    } else {
      setFilteredStations(stations); // Zeige alle Stationen, wenn kein Suchtext eingegeben wurde
    }
  };

  const handlePressOnStation = (station) => {
    if (selectedStation?.name === station.name){
        setSelectedStation(null); 
    } else{
        setSelectedStation(station);
    }
  };

  

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.searchBar}
        placeholder="Station suchen..."
        value={search}
        onChangeText={(text) => filterStations(text)} //Ruft die Filterfunktion auf
      />
      <FlatList
        data={filteredStations} // Gefilterte Stationen
        keyExtractor={(item) => item.name} // Verwende `name` als Schlüssel
        renderItem={({ item }) => (
          <View style={styles.station}>
            <TouchableOpacity 
            onPress={() => handlePressOnStation(item)}
            style={styles.station}>
            <Text style={styles.stationName}>{item.name}</Text>
            </TouchableOpacity>
            {selectedStation?.name === item.name && (
            <FlatList
              data={item.departures} // Abfahrten der Station
              keyExtractor={(departure) => `${item.name}-${departure.departureTime}`} 
              renderItem={({ item: departure }) => (
                <Text style={styles.departure}>
                  Linie {departure.line} Richtung {departure.endstation} um{' '}
                  {new Date(departure.departureTime).toLocaleTimeString()}
                </Text>
              )}
            />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default SearchNoApi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#8fcbbc',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  station: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  departure: {
    fontSize: 14,
    color: '#555',
  },
});
