import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Favourites from '../screens/favourites';
import Settings from '../screens/settings';
import Map from '../screens/map';


const screens = {
    Favourites:{
        screen: Favourites,
        navigationOptions:{
            title: 'Departure Monitor',
        }
    },

    Settings:{
        screen: Settings,
        navigationOptions:{
            title: 'Settings',
        }
    },

    Map:{
        screen: Map,
        navigationOptions:{
            title: 'Map',
        }
    },
}

const HomeStack = createStackNavigator(screens,{
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#eee', height:80 }
    }
});

export default createAppContainer(HomeStack);