import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';

const Settings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        backgroundColor={'#054767'}
        iconName={'chevron-left'}
        title={'Settings'}
        textColor={'#ffffff'}
        onPress={() => navigation.goBack()}
      />
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
