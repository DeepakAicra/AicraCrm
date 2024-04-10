import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {API_URL} from '../../config';
import {useNavigation} from '@react-navigation/native';

const WebClockSquare = ({title}) => {
  const navigation = useNavigation();
  const [showClock, setShowClock] = useState(false);
  const [time, setTime] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const [empId, setEmpId] = useState('');
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    const getPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            console.log('Location permission denied.');
          }
        } else {
          getLocation();
        }
      } catch (error) {
        console.log('Error in getting permissions:', error);
      }
    };

    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => console.log('Geolocation error:', error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };

    const getIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    getPermissions();
    getIpAddress();
    getUserData();
  }, []);

  useEffect(() => {
    let intervalId;
    if (showClock) {
      intervalId = setInterval(updateTime, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [showClock]);

  const updateTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setTime(currentTime);
  };

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      const companyValue = await AsyncStorage.getItem('companyId');
      if (value !== null && companyValue !== null) {
        setEmpId(value);
        setCompanyId(companyValue);
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  const handleClock = async () => {
    const formData = new FormData();
    formData.append('emp_id', empId);
    formData.append('company_id', companyId);
    formData.append('lat', latitude);
    formData.append('long', longitude);
    formData.append('ipaddress', ipAddress);

    const url = showClock ? 'Clock_Out' : 'Clock_In';
    formData.append(showClock ? 'clock_out_time' : 'clock_in_time', time);

    axios({
      url: `${API_URL}${url}`,
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.status) {
          Alert.alert(`Clock-${showClock ? 'out' : 'in'} saved successfully`);
          if (showClock) {
            // Only navigate if clock-out is performed
            navigation.navigate('DailyReportSubmit');
          } else {
            console.log('Clock-in action performed, not navigating.');
          }
        } else {
          Alert.alert(`Clock-${showClock ? 'out' : 'in'} not saved`);
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert(`Error while saving clock-${showClock ? 'out' : 'in'}`);
      });
  };

  const handlePress = () => {
    setShowClock(!showClock);
    if (!showClock) {
      updateTime();
    }
    handleClock();
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
