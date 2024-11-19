import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';


import Favorites from './screens/favorites';
import Settings from './screens/settings';
import Map from './screens/map';
import Tabs from './routes/tabs';


const App = () => {

  const [favorites, setFavorites] = useState([]);//favorites speichert den Zoustand, seFavorites ermeiglecht d'Verännerung vun der

  const addFavorite = (station) => {  	//un d'Funktioun gett en Objet vum typ station iwwerginn ->dei dei gespeichert oder geläscht soll ginn
    if(!favorites.some((item) => item.id === station.id)){   //Iwwerpreift ob d'Statioun net schon an de Favoriten ass (brescht d'Schleif beim Fannen oof)
      setFavorites([...favorites, station]) //Kopie vun de Favoriten gett erstall an dat neit Element gett hanne beigefügt
    }
  };
  const removeFavorite = (stationId) => {
    setFavorites(favorites.filter((fav) => fav.id !== stationId));
  };

  return(
    <NavigationContainer>
      <Tabs
        favorites={favorites}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
      />
    </NavigationContainer>
  );
}

export default App;