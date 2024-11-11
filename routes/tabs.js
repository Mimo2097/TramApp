import React from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Favourites from '../screens/favourites';
import Map from '../screens/map';
import Settings from '../screens/settings';
import Search from '../screens/search';
import FindScreen from '../screens/FindScreen';



const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
    style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center'
    }}
    onPress={onPress}>
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45'

        }}>
            {children}
        </View>
    </TouchableOpacity>
)

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
            <Tab.Screen  name="Favourites" component={Favourites} options={{
                tabBarIcon: ({focused}) => ( //focused um nur das Bild anzuzeigen
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}> 
                            
                        </Text>
                    </View>
                ),
            }}
            />

            <Tab.Screen  name="Map" component={Map} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}> 
                            
                        </Text>
                    </View>
                ),
            }}
            />
            <Tab.Screen  name="Settings" component={Settings} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}> 
                            
                        </Text>
                    </View>
                ),
            }}
            />

            <Tab.Screen  name="Search" component={Search} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}> 
                            
                        </Text>
                    </View>
                ),
            }}
            />
    </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowcolor: '#7F5DF0',
        shadowRadius: 3.5,
        elevation: 5,
    }
})
export default Tabs;


