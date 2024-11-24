import React from 'react';
import {FlatList} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from '../screens/favorites';
import StationDetails from '../screens/StationDetails';

const Stack = createStackNavigator();

const FavoriteStack = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Favorites' component={Favorites} options={{
          headerTitle: 'Favorites',
        }}/>
            <Stack.Screen name='StationDetails' component={StationDetails} options={{title: 'Details'}}/>
        </Stack.Navigator>
    );
};

export default SearchStack;