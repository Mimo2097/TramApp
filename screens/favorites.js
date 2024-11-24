import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Favorites= ({navigation, favorites, addFavorite, removeFavorite}) => {
  console.log('Empfangene Favoritenliste:', favorites);
  const [search, setSearch] = useState('');//
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);//d'Favoriten je nodems filteren
  const [isFocused, setIsFocused] = useState(false); //ass d'Suchleist focuseiert?

  const filterFavorites = (text) => {
    setSearch(text);
    const filtered = favorites.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFavorites(filtered);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
            style={styles.searchBar}//Textinput aktualiseiert automatesch no search
            placeholder="Favoriten suchen..."
            value={search}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(text) => filterFavorites(text)} // Ruft die Filterfunktion auf
      />
      {/*Ass d'Suchleist focusseiert ginn dei gefiltert Favoriten ugewisen*/}
      {isFocused && (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setIsFocused(false); // Verstecke Liste nach Auswahl
                setSearch(item.name); // Setze den Namen der Station in die Suchleiste
              }}
            >
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
      {/*Affichage vun der Favoritelescht je no Filter */}
      
      {filteredFavorites.length === 0? ( //Existeieren keng Favoriten
        <>
        <SafeAreaView style={[styles.box, { width: 350, height: 175 }]}>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Search', { focusSearch: true })}>
            <FontAwesome name="plus" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.emptyText}>It is empty here</Text>
          <Text style={styles.subText}>Start adding your first station</Text>
        </SafeAreaView>
        </>
      ): (
        <>
          <FlatList //Favoritelescht ugewise gett je no Filter
            data={filteredFavorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <View style={{ flexDirection: 'row',
                   justifyContent: 'space-between',
                   alignItems: 'center',
                   width: '100%' 
                   }}
                >
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
                    const alreadyFav = filteredFavorites.some((fav) => fav.id === item.id);
                    if (alreadyFav) {
                      removeFavorite(item.id);
                    } else {
                      addFavorite(item);
                    }
                  }}>
                    <FontAwesome
                      name={filteredFavorites.some((fav) => fav.id === item.id) ? 'star' : 'star-o'} // Icon wechselt
                      size={24}
                      color={filteredFavorites.some((fav) => fav.id === item.id) ? 'gold' : 'gray'} // Farbe wechselt
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
    paddingHorizontal: 15,
    backgroundColor: '#007ACC', // Blaues Hintergrund
  },
  searchBar: {
    height: 50,
    marginVertical: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Schatten auf Android
  },
  box: {
    borderWidth: 2, // Breite der Umrandung
    borderColor: 'black', // Farbe der Umrandung
    borderRadius: 15, // Abgerundete Ecken
    padding: 20, // Innenabstand
    marginVertical: 10, // Abstand oben und unten
    alignItems: 'center', // Zentriert den Text
    backgroundColor: 'white',
  },
  stationDetails: {
    flex: 1, // Text nimmt den freien Platz ein
    paddingRight: 10, // Abstand zum Icon
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dunkler Text
  },
  departure: {
    fontSize: 14,
    color: '#666', // Neutraler Text
    marginTop: 5,
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFBEA', // Gelblicher Hintergrund
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
