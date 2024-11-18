import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';


const Favorites= ({navigation}) => {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <Text>Favorites Screen</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Haltestation suchen..."
        value={search}
        onChangeText={(text) => setSearch(text)} // Ruft die Filterfunktion auf
      />
      <Button title='Click Here!' alert={'Button Clicked!'}/>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc'
  },
  searchBar:{
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    showOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  }
});
