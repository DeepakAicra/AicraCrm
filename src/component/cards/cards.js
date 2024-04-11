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
    height: 120,
    width: 110,
    margin: 8,
    elevation: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  txtStyle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'auto',
    color: '#fff',
    marginVertical: 5,
    marginHorizontal: 5
  },
});
export default Square;
