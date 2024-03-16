import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';

const Schedule = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        backgroundColor={'#054767'}
        iconName={'chevron-left'}
        title={'Schedule'}
        textColor={'#ffffff'}
        onPress={() => navigation.goBack()}
      />
      <Text>Schedule</Text>
    </View>
  );
};

export default Schedule;
