import React from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Favorites from '../screens/favorites';
import Map from '../screens/map';
import Settings from '../screens/settings';
import SearchNoApi from '../screens/SearchNoApi';
import SearchStack from './SearchStack';



const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style:{
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height: 90,
            ...styles.shadow
          }
        }}
        >
            <Tab.Screen  name="Favorites" component={Favorites} options={{
                tabBarIcon: ({focused}) => ( //focused um nur das Bild anzuzeigen
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Ionicons name="bookmark" size={20} color="#000" />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>

                        </Text>
                    </View>
                ),
            }}
            />

            <Tab.Screen  name="Map" component={Map} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <FontistoIcon name="map" size={20} color="#000" />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}> 
                            
                        </Text>
                    </View>
                ),
            }}
            />

            <Tab.Screen  name="Search" component={SearchStack} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <FontistoIcon name="search" size={20} color="#000" />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}> 
                            
                        </Text>
                    </View>
                ),
            }}
            />
  
            <Tab.Screen  name="Settings" component={Settings} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <FeatherIcon name="settings" size={20} color="#000" />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}> 
                            
                        </Text>
                    </View>
                ),
            }}
            />


    </Tab.Navigator>
    );
}
export default Tabs;

const styles = StyleSheet.create({
    shadow: {
        shadowcolor: '#7F5DF0',
        shadowRadius: 3.5,
        elevation: 5,
    }
})



