import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const Map= ({navigation}) => {
  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill} provider={MapView.PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 49.6116,
        longitude: 6.1319,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}/>
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
});
