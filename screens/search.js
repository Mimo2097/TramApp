import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';


const Search= ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button title='Click Here!' alert={'Button Clicked!'}/>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc'
  },
});
