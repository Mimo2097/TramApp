import React from 'react';
import {FlatList} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import SearchNoApi from '../screens/SearchNoApi';
import StationDetails from '../screens/StationDetails';

const Stack = createStackNavigator();

const SearchStack = ({ favorites, addFavorite, removeFavorite }) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name='SearchNoApi' 
            options={{headerTitle: 'Search'}}
            component={(props) => (
                <SearchNoApi
                    favorites={favorites}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    {...props}/>
                )}
            />

            <Stack.Screen name='StationDetails' component={StationDetails} options={{title: 'Details'}}/>
        </Stack.Navigator>
    );
};

export default SearchStack;