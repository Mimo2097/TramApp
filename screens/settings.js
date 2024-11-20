import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const Settings= ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button title='Click Here!' alert={'Button Clicked!'}/>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007ACC'
  },
});
