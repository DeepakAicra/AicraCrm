import React, {useEffect} from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import styles from './styles';

const Splash = ({navigation}) => {
  useEffect(() => {
    getSession();
  });

  const getSession = () => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.contentCenter}>
          <Image
            source={require('../../Assets/Images/logo.png')}
            style={{
              width: 187,
              height: 88,
              marginTop: 250,
            }}
          />
        </View>
        <Text style={styles.title}>AICRA CRM</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
