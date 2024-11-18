import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';

// Definiere den API-Endpunkt
const API_ENDPOINT = 'https://example.com/api/stations';

const StationListWithSearch = () => {
  const [query, setQuery] = useState(''); // Suchtext
  const [data, setData] = useState([]); // Geladene Daten
  const [filteredData, setFilteredData] = useState([]); // Gefilterte Daten basierend auf der Suche
  const [isLoading, setIsLoading] = useState(false); // Ladezustand
  const [error, setError] = useState(null); // Fehlerzustand

  // Daten von der API abrufen
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_ENDPOINT);
        const json = await response.json();
        setData(json.results); // Ergebnisse aus der API setzen
        setFilteredData(json.results); // Initial alle Daten in die gefilterten Daten setzen
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Wird nur einmal bei der Initialisierung ausgeführt

  // Suchfunktion
  const handleSearch = (text) => {
    setQuery(text); // Suchtext aktualisieren
    if (text) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered); // Gefilterte Daten setzen
    } else {
      setFilteredData(data); // Wenn kein Suchtext, zeige alle Daten
    }
  };

  // Wenn Daten geladen werden
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={30} color="#5500dc" />
      </View>
    );
  }

  // Wenn ein Fehler auftritt
  if (error) {
    return (
      <View style={styles.center}>
        <Text>Fehler beim Abrufen der Daten. Überprüfen Sie Ihre Internetverbindung.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Suchleiste */}
      <TextInput
        style={styles.searchBar}
        placeholder="Station suchen..."
        value={query}
        onChangeText={handleSearch} // Filterlogik aufrufen
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
      />

      {/* Liste der gefilterten Stationen */}
      <FlatList
        data={filteredData} // Gefilterte Daten
        keyExtractor={(item) => item.name} // Eindeutiger Schlüssel
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default StationListWithSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fcbbc',
    paddingHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    elevation: 2,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
  },
});
