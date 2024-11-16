import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchNoApi from '../screens/SearchNoApi';
import StationDetails from '../screens/StationDetails';

const Stack = createStackNavigator();

const SearchStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='SearchNoApi' component={SearchNoApi} options={{title: 'Stationdetails'}}/>
            <Stack.Screen name='StationDetails' component={StationDetails} options={{title: 'Station Details'}}/>
        </Stack.Navigator>
    );
};

export default SearchStack;