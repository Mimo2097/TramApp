import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const StationDetails = ({ route }) => { // route enthält die übergebenen Parameter
    const { station } = route.params; // Extrahiere die Station aus den übergebenen Parametern

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{station.name}</Text>
        </View>
    );
};

export default StationDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
});
