import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';


import Favourites from './screens/favourites';
import Settings from './screens/settings';
import Map from './screens/map';
import Tabs from './routes/tabs';


const App = () => {
  return(
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  );
}

export default App;