import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const WebClockSquare = ({title}) => {
  const [showClock, setShowClock] = useState(false);
  const [time, setTime] = useState('');

  const handlePress = () => {
    if (!showClock) {
      updateTime();
    }
    setShowClock(!showClock);
  };

  const updateTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtStyle}>{title}</Text>
      {showClock && <Text style={styles.txtStyle}>{time}</Text>}
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>
          {showClock ? 'Clock Out' : 'Clock In'}
        </Text>
      </TouchableOpacity>
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
  button: {
    width: '65%',
    height: 30,
    backgroundColor: '#49be25',
    borderRadius: 5,
    justifyContent: 'center',
    elevation: 3,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 12,
    color: '#ecf4ff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WebClockSquare;
