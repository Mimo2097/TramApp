import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


const Map= ({navigation}) => {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill} provider={MapView.PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 49.6116,
        longitude: 6.1319,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}/>
      <TextInput style={styles.searchBar}
      placeholder = "Hier suchen"
      value={search}
      onChangeText={(text) => setSearch(text)}/>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc'
  },
  map:{
    width: '100%',
    height: '100%'
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
  }
});
