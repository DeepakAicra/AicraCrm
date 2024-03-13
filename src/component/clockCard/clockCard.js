import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

const ClockSquare = ({title, value, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.square} onPress={onPress}>
        <Text style={styles.valueTxtStyle}>{value}</Text>
        <Text style={styles.txtStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#012131',
    height: 120,
    width: 110,
    margin: 8,
    elevation: 5,
    borderRadius: 25,
    borderColor: '#06B6DF',
    borderWidth: 1,
    justifyContent: 'center',
  },
  valueTxtStyle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#06B6DF',
    marginVertical: 5,
  },
  txtStyle: {
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    color: '#ffffff',
    marginVertical: 5,
  },
});
export default ClockSquare;
