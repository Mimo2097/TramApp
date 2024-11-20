import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { stations } from '../data';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';


const SearchNoApi = ({ navigation, favorites, addFavorite, removeFavorite, route }) => {
  console.log('Empfangene Favoritenliste Search:', favorites);
  const [startSearch, setStartSearch] = useState('');
  const [endSearch, setEndSearch] = useState('');
  const [filteredResults, setFilteredResults] = useState(stations);

  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  const toggleFavorite = (station) => {
    const alreadyFav = favorites.find((item) => item.id === station.id);
    if (alreadyFav) {
      removeFavorite(station.id);
    } else {
      addFavorite(station);
    }
  };

  useEffect(() => {
    console.log('Aktuelle Favoritenliste:', favorites);
  }, [favorites]);

  useEffect(() => {
    const results = stations.filter((station) => {
      const isStartMatch = station.name.toLowerCase().includes(startSearch.toLowerCase());
      const isEndMatch = station.departures.some((departure) =>
        departure.endstation.toLowerCase().includes(endSearch.toLowerCase())
      );
      return isStartMatch && isEndMatch;
    });
    setFilteredResults(results);
  }, [startSearch, endSearch]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Eingabefelder */}
      <TextInput
        ref={startInputRef}
        style={styles.searchBar}
        placeholder="Startstation eingeben"
        value={startSearch}
        onChangeText={setStartSearch}
      />
      <TextInput
        ref={endInputRef}
        style={styles.searchBar}
        placeholder="Zielstation eingeben"
        value={endSearch}
        onChangeText={setEndSearch}
      />

      {/* Liste der gefilterten Ergebnisse */}
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.station}>
            <TouchableOpacity
              onPress={() => navigation.navigate('StationDetails', { station: item })}
              style={styles.stationDetails}
            >
              <Text style={styles.stationName}>{item.name}</Text>
              <Text style={styles.departure}>
                Endstationen: {item.departures.map((d) => d.endstation).join(', ')}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                if (!favorites.some((fav) => fav.id === item.id)) {
                  addFavorite(item);
                } else {
                  removeFavorite(item.id);
                }
              }}
            > */}
              {/* <FontAwesome
                name={favorites.some((fav) => fav.id === item.id) ? 'star' : 'star-o'}
                size={20}
                color="gold"
              />
            </TouchableOpacity> */}
            <TouchableOpacity>
              <Icon name="star" size={24} color="gold" style={styles.icon} onPress={() => toggleFavorite(item)}/>
            </TouchableOpacity>
            
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Keine Ergebnisse gefunden</Text>}
      />
    </SafeAreaView>
  );
};

export default SearchNoApi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  station: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  departure: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  icon: {
    marginLeft: 'auto',
  },
});
