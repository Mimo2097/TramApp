import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const StationDetails = ({ route }) => { // route enthält die übergebenen Parameter
    const { station } = route.params; // Extrahiere die Station aus den übergebenen Parametern

    return (
        <View style={styles.container}>
            <Text style={styles.stationName}>{item.name}</Text>
                <Text style={styles.departure}>
                  Linie: {item.departures[0].line} Endstationen: {item.departures[0].endstation}
                </Text>
                <Text style={styles.departure}>
                  Abfahrten:
                </Text>
                {item.departures.map((departure, index) => (
                  <Text key={index} style={styles.departure}>
                    {departure.departureTime}
                  </Text>
                ))}      
        </View>
    );
};

export default StationDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Angenehmer Hintergrund
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007BFF', // Blaue Farbe für den Titel
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff', // Weißer Hintergrund für jeden Eintrag
    borderRadius: 8, // Abgerundete Kanten
    shadowColor: '#000', // Schatten für Tiefe
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Für Android-Schatten
    color: '#333',
  },
});
