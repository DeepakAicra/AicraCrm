import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import AttendanceCard from '../../component/attendanceCard/attendance';

const Attendance = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllEntries, setShowAllEntries] = useState(false);

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
          // Store all data initially
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

  const handleSeeMorePress = () => {
    // Toggle state to show all entries
    setShowAllEntries(true);
  };

  const calculateWorkingHours = (clockIn, clockOut) => {
    const today = new Date(); // Get today's date
    const clockInTime = new Date(`${today.toDateString()} ${clockIn}`);
    const clockOutTime = new Date(`${today.toDateString()} ${clockOut}`);
    const diffMs = clockOutTime - clockInTime;
    const diffHrs = Math.floor(diffMs / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return `${diffHrs} hours ${diffMins} minutes`;
  };

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
        {attendanceList
          .slice(0, showAllEntries ? attendanceList.length : 10)
          .map((item, index) => (
            <AttendanceCard
              key={index}
              date={item.date}
              name={item.user_name}
              clock_in={item.machin_intime}
              clock_out={item.machin_outtime}
              working_hours={calculateWorkingHours(
                item.machin_intime,
                item.machin_outtime,
              )}
              remarks={item.perday_remarks}
            />
          ))}
        {loading ? (
          <ActivityIndicator size="large" color="#e61789" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : attendanceList.length === 0 ? (
          <Text>No attendance data available.</Text>
        ) : (
          !showAllEntries && (
            <TouchableOpacity
              style={styles.seeMoreTouch}
              onPress={handleSeeMorePress}>
              <Text style={styles.seeMoreTxt}>See More...</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default Attendance;
