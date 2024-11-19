import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Favorites= ({navigation, favorites, addFavorite, removeFavorite}) => {
  const [search, setSearch] = useState('');
  return (

    <View style={styles.container}>
      <TextInput
            style={styles.searchBar}
            placeholder="Haltestation suchen..."
            value={search}
            onChangeText={(text) => setSearch(text)} // Ruft die Filterfunktion auf
          />
      {favorites.length === 0? (
        <>
        <TouchableOpacity style={styles.addButton} onPress={addFavorite}>
          <FontAwesome name="plus" size={30} color="gray" />
        </TouchableOpacity>
        <Text style={styles.emptyText}>It is empty here</Text>
        <Text style={styles.subText}>Start adding your first station</Text>
        </>
      ): (
        <>
        
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View >
                <Text >{item.name}</Text>
                <Text >
                  Latitude: {item.location.latitude}, Longitude: {item.location.longitude}
                </Text>
              </View>
            )}
          />
          </>
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc'
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
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 10,
  },
  subText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});
