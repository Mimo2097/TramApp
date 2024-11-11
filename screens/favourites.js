import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';


const Favourites= ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Favourites Screen</Text>
      <Button title='Click Here!' alert={'Button Clicked!'}/>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc'
  },
});
