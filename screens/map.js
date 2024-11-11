import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';


const Map= ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      <Button title='Click Here!' alert={'Button Clicked!'}/>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc'
  },
});
