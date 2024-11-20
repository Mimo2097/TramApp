import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {stations} from './data'
import {useEffect} from 'react'

import Favorites from './screens/favorites';
import Settings from './screens/settings';
import Map from './screens/map';
import Tabs from './routes/tabs';

const App = () => {

  const [favorites, setFavorites] = useState([]);       //favorites speichert den Zoustand, seFavorites ermeiglecht d'Verännerung vun der
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
          console.log('Favoriten geladen:', JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Fehler beim Laden der Favoriten:', error);
      }
    };
    loadFavorites();
  }, []);

  // Favoriten speichern, wenn sie sich ändern
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favoriten gespeichert:', favorites);
      } catch (error) {
        console.error('Fehler beim Speichern der Favoriten:', error);
      }
    };
    saveFavorites();
  }, [favorites]);

  const addFavorite = (station) => {
    const alreadyFav = favorites.find((item) => item.id === station.id);
    if (!alreadyFav) {
      setFavorites([...favorites, station]);
    }
  };

  const removeFavorite = (stationId) => {
    setFavorites(favorites.filter((fav) => fav.id !== stationId));
  };
  console.log('Initiale Favoriten', favorites);

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