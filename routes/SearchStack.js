import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchNoApi from '../screens/SearchNoApi';
import StationDetails from '../screens/StationDetails';

const Stack = createStackNavigator();

const SearchStack = ({ favorites, addFavorite, removeFavorite, toggleFavorite }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='SearchNoApi'
                options={{ headerTitle: 'Search' }}
            >
                {(props) => (
                    <SearchNoApi
                        {...props} // Standard-Props weitergeben
                        favorites={favorites}
                        addFavorite={addFavorite}
                        removeFavorite={removeFavorite}
                        toggleFavorite={toggleFavorite}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen 
                name='StationDetails' 
                component={StationDetails} 
                options={{ title: 'Details' }} 
            />
        </Stack.Navigator>
    );
};

export default SearchStack;
