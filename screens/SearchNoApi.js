import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { stations } from '../data';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const SearchNoApi = ({navigation, favorites, addFavorite, removeFavorite}) => {
  const [search, setSearch] = useState(''); 
  const [filteredStations, setFilteredStations] = useState(stations); // Gefiltert Statiounen
  const [selectedStation, setSelectedStation] = useState(null);

 
  const filterStations = (text) => {
    setSearch(text); 
    if (text) {
      const filtered = stations.filter((station) =>
        station.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredStations(filtered); 
    } else {
      setFilteredStations(stations); 
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
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Haltestation suchen..."
        value={search}
        onChangeText={(text) => filterStations(text)}
      />
      <FlatList
        data={filteredStations} 
        keyExtractor={(item) => item.name} 
        renderItem={({ item }) => (
          <View style={styles.station}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('StationDetails', {station: item})} 
              style={styles.station}
            >
              <Text style={styles.stationName}>{item.name}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity 
              onPress={() => {
                if (!favorites.some((fav) => fav.id === item.id)) {
                  addFavorite(item); 
                } else {
                  removeFavorite(item.id);
                }
              }}
            >
              <FontAwesome name={favorites.some((fav) => fav.id === item.id) ? 'star' : 'star-o'}
              size={20} color="white" />
            </TouchableOpacity> */}
          </View>
        )}
      />
    </SafeAreaView>
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
