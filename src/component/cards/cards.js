import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Square = ({title, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtStyle}>{title}</Text>
      <Text style={styles.txtStyle}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#054761',
    height: 140,
    width: 120,
    margin: 8,
    elevation: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  txtStyle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
    marginVertical: 5,
  },
});
export default Square;
