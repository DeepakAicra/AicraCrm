import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';

const GlobalSearch = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        backgroundColor={'#054767'}
        iconName={'chevron-left'}
        title={'Global Search'}
        textColor={'#ffffff'}
        onPress={() => navigation.goBack()}
      />
      <Text>GlobalSearch</Text>
    </View>
  );
};

export default GlobalSearch;
