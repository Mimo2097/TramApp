import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Favorites= ({navigation, favorites, addFavorite, removeFavorite}) => {
  console.log('Empfangene Favoritenliste:', favorites);
  const [search, setSearch] = useState('');
  
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
            style={styles.searchBar}
            placeholder="Favoriten suchen..."
            value={search}
            onChangeText={(text) => setSearch(text)} // Ruft die Filterfunktion auf
          />
      {favorites.length === 0? (
        <>
        <View style={[styles.box, { width: 350, height: 175 }]}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Search', { focusSearch: true })}>
          <FontAwesome name="plus" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.emptyText}>It is empty here</Text>
        <Text style={styles.subText}>Start adding your first station</Text>
        </View>
        </>
      ): (
        <>
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <View>
                    <Text style={styles.stationName}>{item.name}</Text>
                    <Text style={styles.departure}>
                      Linie: {item.departures[0].line} Endstation: {item.departures[0].endstation}
                    </Text>
                    <Text style={styles.departure}>Abfahrten:</Text>
                    {item.departures.map((departure, index) => (
                      <Text key={index} style={styles.departure}>
                        {departure.departureTime}
                      </Text>
                    ))}
                  </View>
                  {/* Favoriten-Icon */}
                  <TouchableOpacity onPress={() => {
                    const alreadyFav = favorites.some((fav) => fav.id === item.id);
                    if (alreadyFav) {
                      removeFavorite(item.id);
                    } else {
                      addFavorite(item);
                    }
                  }}>
                    <FontAwesome
                      name={favorites.some((fav) => fav.id === item.id) ? 'star' : 'star-o'} // Icon wechselt
                      size={24}
                      color={favorites.some((fav) => fav.id === item.id) ? 'gold' : 'gray'} // Farbe wechselt
                    />
        </TouchableOpacity>
      </View>
    </View>
  )}
/>
          </>
      )}
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007ACC'
  },
  searchBar:{
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    showOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  subText: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  box: {
    borderWidth: 2, // Breite der Umrandung
    borderColor: 'white', // Farbe der Umrandung
    borderRadius: 15, // Abgerundete Ecken
    padding: 20, // Innenabstand
    marginVertical: 10, // Abstand oben und unten
    alignItems: 'center', // Zentriert den Text
    backgroundColor: 'white',
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  departure: {
    fontSize: 14,
    color: 'black',
  },
});
