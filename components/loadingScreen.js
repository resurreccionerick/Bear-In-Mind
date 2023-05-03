import React from 'react';

import { View, Text, ActivityIndicator, StyleSheet, Image} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
    source={require('../assets/logo.png')}
    style={styles.logo}/>
      <Text style={styles.text}>Loading...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:"#f8f8f8",
    alignItems: 'center',
  },
  logo: {
  
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  text: {
    fontSize:20,
    marginTop: 10,
    marginBottom: 20
  },
});

export default LoadingScreen;