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

  useEffect(() => {
    const filtered = favorites.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFavorites(filtered); // Gefilterte Liste aktualisieren
  }, [favorites, search]);
  
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
        <View style={styles.searchResultsContainer}>
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
        </View>
      )}
      {/*Affichage vun der Favoritelescht je no Filter */}
      
      {filteredFavorites.length === 0? ( //Existeieren keng Favoriten
        <>
        <SafeAreaView style={[styles.box, { width: 350, height: 175 }]}>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Search', { focusSearch: true })}>
            <FontAwesome name="plus" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.emptyText}>It is empty here</Text>
          <Text style={styles.subText}>Start adding your first station</Text>
        </SafeAreaView>
        </>
      ): (
        <>
          <FlatList //Favoritelescht gefiltert
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
                    const alreadyFav = favorites.some((fav) => fav.id === item.id);
                    if (alreadyFav) {
                      removeFavorite(item.id);
                    } else {
                      addFavorite(item);
                    }
                  }}>
                    <FontAwesome
                      name={favorites.some((fav) => fav.name === item.name) ? 'star' : 'star-o'} // Icon wechselt
                      size={24}
                      color={favorites.some((fav) => fav.name === item.name) ? 'gold' : 'gray'} // Farbe wechselt
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
  
  searchResultsContainer: {
    position: 'absolute', // Absolut positioniert
    top: 100, // Unter der Suchleiste
    left: 15,
    right: 15,
    maxHeight: 300, // Begrenzte Höhe der Suchergebnisse
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 100, // Überlagert den restlichen Inhalt
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    width: 60, // Breite und Höhe gleich
    height: 60,
    borderColor: 'black',
    borderRadius: 30, // Die Hälfte der Breite/Höhe, um einen Kreis zu formen
    backgroundColor: '#007ACC', // Farbe des Buttons
    justifyContent: 'center', // Zentrierung des Inhalts
    alignItems: 'center', // Zentrierung des Inhalts
    position: 'absolute', // Absolute Positionierung
    bottom: 100, // Abstand vom unteren Rand
    right: 140, // Abstand vom rechten Rand
  },
  emptyText: {
    fontSize: 20, // Größerer Text für Sichtbarkeit
    fontWeight: 'bold', // Fettgedruckt für Betonung
    color: '#333', // Dunkle Farbe für guten Kontrast
    textAlign: 'center', // Zentrierter Text
    marginTop: 20, // Abstand nach oben
  },
  subText: {
    fontSize: 16, // Etwas kleiner für unterstützenden Text
    color: '#555', // Neutralere Farbe für weniger Betonung
    textAlign: 'center', // Zentrierter Text
    marginTop: 10, // Kleiner Abstand zum oberen Text
    paddingHorizontal: 15, // Platz für längere Texte
  },
});
