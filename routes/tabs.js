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

const Tabs = ({ favorites, addFavorite, removeFavorite }) => {
    return (
        <Tab.Navigator
        screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#F5F5F5',
        height: 90,
        },
        }}
        >
            <Tab.Screen  
            name="Favorites" 
            options={{
                tabBarIcon: ({focused}) => ( //focused um nur das Bild anzuzeigen
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Ionicons name="bookmark" size={focused ? 24 : 20} color={focused ? '#007BFF' : '#748c94'} />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>

                        </Text>
                    </View>
                ),
            }}
            >
            {({navigation}) => (
            <Favorites //Screen Favorites kritt Props favorites, addFav, removeFav als children-Prop iwwerginn 
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                navigation={navigation}
            />
            )}
            </Tab.Screen>

            <Tab.Screen  
            name="Map"
             options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <FontistoIcon name="map" size={focused ? 24 : 20} color={focused ? '#007BFF' : '#748c94'} />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}> 
                            
                        </Text>
                    </View>
                ),
            }}
            >
            {({navigation}) => (
            <Map //Screen Favorites kritt Props favorites, addFav, removeFav als children-Prop iwwerginn 
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                navigation={navigation}
            />
            )}
            </Tab.Screen>

            <Tab.Screen  
            name="Search" 
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <FontistoIcon name="search" size={focused ? 24 : 20} color={focused ? '#007BFF' : '#748c94'} />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}> 
                            
                        </Text>
                    </View>
                ),
            }}
            >
            {({navigation}) => (//manuelle Übergabe des Props navigation da dies für children nicht automatisch erfolgt
                <SearchNoApi //Screen Favorites kritt Props favorites, addFav, removeFav als children-Prop iwwerginn 
                    favorites={favorites}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    navigation={navigation}
                />
                )}
            </Tab.Screen>
  
            <Tab.Screen  name="Settings" component={Settings} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <FeatherIcon name="settings" size={focused ? 24 : 20} color={focused ? '#007BFF' : '#748c94'} />
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
        shadowColor: '#7F5DF0',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      },
      
})



