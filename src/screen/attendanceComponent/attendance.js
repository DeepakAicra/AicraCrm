import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import AttendanceCard from '../../component/attendance';

const Attendance = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        setEmpId(value);
      }
    } catch (error) {
      console.log('Error getting user data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}Attendance?emp_id=${empId}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (response.data.error === 'false') {
          setAttendanceList(response.data.attendance_data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (empId !== '') {
      fetchData();
    }
  }, [empId]);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={'#054767'}
        iconName={'chevron-left'}
        title={'Attendance'}
        textColor={'#ffffff'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#e61789" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : attendanceList.length === 0 ? (
          <Text>No attendance data available.</Text>
        ) : (
          attendanceList.map((item, index) => (
            <AttendanceCard
              key={index}
              date={item.date}
              name={item.user_name}
              clock_in={item.machin_intime}
              clock_out={item.machin_outtime}
              remarks={item.perday_remarks}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Attendance;
