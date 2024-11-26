import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList,TouchableOpacity, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { stations } from '../data';

const Map = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedStation, setSelectedStation] = useState(null);
  const mapRef = useRef(null);

  {/*Progres vum Tramm */}
  const [currentTramPosition, setCurrentTramPosition] = useState(stations[0].location);
  const [currentIndex, setCurrentIndex] = useState(0); // Aktuelle Haltestelle
  const [progress, setProgress] = useState(0);

  
  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );
    
  const routeOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];//Reihenfolg fir d'Polyline

  {/*Gett d'locations fir die verschidden Statiounen aus*/}
  const routeCoordinates = routeOrder.map((id) => {
    const station = stations.find((item) => item.id === id);
    return {
      latitude: station.location.latitude,
      longitude: station.location.longitude,
    };
  });

  {/*Aktualiseiert all Minutt dei intern Zait*/}
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date()); 
    }, 60000); 
    return () => clearInterval(interval); // Speicherlecks vermeiden
  }, []);

  {/*Berechent dei nächsten Abfahrt pro Statioun*/}
  const getNextDepartures = (departures) => {
    console.log('Aktuelle Zeit:', currentTime.toISOString());
    departures.forEach(departure => {
      console.log('Abfahrtszeit:', departure.departureTime, 'Differenz in ms:', new Date(departure.departureTime) - currentTime);
    });

    {/*Berechent die nächsten Abfahrten*/}
    const futureDepartures = departures
      .map((departure) => ({
        ...departure,
        timeDiff: new Date(departure.departureTime) - currentTime,
      }))
      .filter((departure) => departure.timeDiff > 0) // Nemmen Abfahrten an der Zukunft ginn ugewisen
      .sort((a, b) => a.timeDiff - b.timeDiff); // Dat eischt Element (dei nächsten Abfahrt) gett ugewisen
    return futureDepartures.slice(0, 1);
  };

  const handleNodePress = (id) => {
    // Finde die Station basierend auf der ID
    const station = stations.find((s) => s.id === id);
    if (station) {
      setSelectedStation({
        name: station.name,
        nextDeparture: station.departures.length > 0
          ? `Linie ${station.departures[0].line} um ${new Date(station.departures[0].departureTime)
              .toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`
          : 'Keine weiteren Abfahrten',
      });
    }
  };

  {/*Simuleiert d'Fahrt vum Tram*/}
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % stations.length; // Tram bewegt sech zyklisch durch d'Statiounen
      setCurrentTramPosition(stations[index].location);
    }, 3000); // Bewegung all 3 Sekunden
    return () => clearInterval(interval);
  }, []);

  

  return (
    <View style={styles.container}>
      <MapView 
      style={StyleSheet.absoluteFillObject} 
      provider={MapView.PROVIDER_GOOGLE}
      ref={mapRef}
      initialRegion={{
        latitude: 49.6116,
        longitude: 6.1319,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        }}
      >
        
        {stations.map((station) => (
          <Marker
          key={station.id}
                coordinate={{
                  latitude: station.location.latitude,
                  longitude: station.location.longitude,
          }}>
            <View style={styles.metroPoint} />
          </Marker>
        ))}
    
        {filteredStations.map((station) => {//itereiert durch all Statioun an filteredStations
          const nextDeparture = getNextDepartures(station.departures);//nextDeparture ass eng weider Lescht
          return (
            <Marker
              key={station.id}
              coordinate={{
                latitude: station.location.latitude,
                longitude: station.location.longitude,
              }}
              title={station.name}
              description={
                nextDeparture.length > 0
                  ? `Nächste Abfahrt: Linie ${nextDeparture[0].line} um ${new Date(
                      nextDeparture[0].departureTime
                    ).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`
                  : 'Keine weiteren Abfahrten'
              }
            >
              <View>
                <Icon name="place" size={30} color="blue" />
              </View>
            </Marker>
          );
        })}
        
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="rgba(0, 123, 255, 0.8)"
          strokeWidth={4} // Linienbreite
        />
      </MapView>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Hier suchen"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <View style={styles.lineContainer}>
        <View style={styles.line}>
          {stations.map((station, index) => (
            <TouchableOpacity
            key={station.id}
            style={[
              styles.node,
              { left: `${(index + 1) * (100 / (stations.length + 1))}%` },
            ]}
            onPress={() => handleNodePress(station.id)} // Handle Node Press
          />
        ))}
        </View>
      {/* Informationen der ausgewählten Station */}
        {selectedStation && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{selectedStation.name}</Text>
            {/* <Text style={styles.infoText}>Abfahrt: {selectedStation.nextDeparture}</Text> */}
          </View>
        )}
      </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBar: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },

  metroPoint: {
    width: 10, // Durchmesser des Punkts
    height: 10,
    borderRadius: 5, // Macht den Punkt rund (Hälfte der Breite)
    backgroundColor: '#007ACC', // Farbe des Punkts
    borderWidth: 2, // Optionale Umrandung
    borderColor: '#FFFFFF', // Weiße Umrandung
  },

  listContainer: {
    height: 30, // Definierter Bereich für die Liste
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparenter Hintergrund
    marginBottom: -500,
  },

  lineContainer: {
    position: 'absolute',
    bottom: 90, // Abstand vom unteren Rand
    width: '100%', // Linie über die gesamte Breite
    height: 50, // Genügend Platz für die Knoten und Linie
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Über der Karte anzeigen
  },
  line: {
    position: 'relative',
    width: '95%',
    height: 25,
    backgroundColor: '#007ACC',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, 
  },
  
  node: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'white',
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeLabel: {
    position: 'absolute',
    top: 70, 
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 40, // Beschriftung 30px über der Linie
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 5,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default Map;
