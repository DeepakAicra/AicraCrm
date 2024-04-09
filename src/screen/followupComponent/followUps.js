import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';
import TableCard from '../../component/tableCards';

const FollowUps = ({navigation}) => {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [date, setDate] = useState(new Date());
  const [fromShowPicker, setFromShowPicker] = useState(false);
  const [toShowPicker, setToShowPicker] = useState(false);
  const [empId, setEmpId] = useState('');
  const [followInfoList, setFollowInfoList] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleFromDatePicker = () => {
    setFromShowPicker(!fromShowPicker);
  };

  const toggleToDatePicker = () => {
    setToShowPicker(!toShowPicker);
  };

  const onChangeFrom = ({type}, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleFromDatePicker();
        setFromDate(formatDate(currentDate));
      }
    } else {
      toggleFromDatePicker();
    }
  };

  const onChangeTo = ({type}, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleToDatePicker();
        setToDate(formatDate(currentDate));
      }
    } else {
      toggleToDatePicker();
    }
  };

  const confirmIOSFromDate = () => {
    setFromDate(formatDate(date));
    toggleFromDatePicker();
  };

  const confirmIOSToDate = () => {
    setToDate(formatDate(date));
    toggleToDatePicker();
  };

  const formatDate = rawDate => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const getUserData = async () => {
    const value = await AsyncStorage.getItem('userId');
    setEmpId(value);
  };

  useEffect(() => {
    axios({
      url: `${API_URL}Follow_Ups?empid=${empId}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.status == true) {
          setFollowInfoList(response.data.follow_up_data);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });

    getUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        backgroundColor={'#054767'}
        iconName={'chevron-left'}
        title={'Follow Ups'}
        textColor={'#ffffff'}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.mainView}>
        <Text style={styles.titleStyle}>Follow Up List</Text>
        {/* <View style={styles.selectedItemView}>
          <Text style={styles.titleTextBox}>From Date</Text>
          <View style={styles.textInputContainer}>
            {fromShowPicker && (
              <DateTimePicker
                mode="date"
                is24Hour={false}
                display="spinner"
                value={date}
                onChange={onChangeFrom}
                positiveButton={{label: 'OK', textColor: 'green'}}
                negativeButton={{label: 'Cancel', textColor: 'red'}}
                style={styles.datePicker}
              />
            )}
            {fromShowPicker && Platform.OS === 'ios' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  style={[
                    styles.datePickerButton,
                    styles.pickerButton,
                    {backgroundColor: '#11182711'},
                  ]}
                  onPress={toggleFromDatePicker}>
                  <Text style={[styles.buttonText, {color: '#075985'}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.datePickerButton, styles.pickerButton]}
                  onPress={confirmIOSFromDate}>
                  <Text style={[styles.buttonText]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
            {!fromShowPicker && (
              <Pressable onPress={confirmIOSFromDate}>
                <TextInput
                  placeholder="--YYYY--MM-DD--"
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  editable={false}
                  value={fromDate}
                  onChangeText={setFromDate}
                  onPressIn={toggleFromDatePicker}
                  style={styles.textInputStyle}
                />
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.selectedItemView}>
          <Text style={styles.titleTextBox}>To Date</Text>
          <View style={styles.textInputContainer}>
            {toShowPicker && (
              <DateTimePicker
                mode="date"
                is24Hour={false}
                display="spinner"
                value={date}
                onChange={onChangeTo}
                positiveButton={{label: 'OK', textColor: 'green'}}
                negativeButton={{label: 'Cancel', textColor: 'red'}}
                style={styles.datePicker}
              />
            )}
            {toShowPicker && Platform.OS === 'ios' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  style={[
                    styles.datePickerButton,
                    styles.pickerButton,
                    {backgroundColor: '#11182711'},
                  ]}
                  onPress={toggleToDatePicker}>
                  <Text style={[styles.buttonText, {color: '#075985'}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.datePickerButton, styles.pickerButton]}
                  onPress={confirmIOSToDate}>
                  <Text style={[styles.buttonText]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
            {!toShowPicker && (
              <Pressable onPress={confirmIOSToDate}>
                <TextInput
                  placeholder="--YYYY--MM-DD--"
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  editable={false}
                  value={toDate}
                  onChangeText={setToDate}
                  onPressIn={toggleToDatePicker}
                  style={styles.textInputStyle}
                />
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.combineButtonView}>
          <TouchableOpacity style={styles.firstButton}>
            <Text style={styles.firstButtonText}>Find Follow Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondButton}>
            <Text style={styles.secondButtonText}>Clear</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#e61789" />
        ) : followInfoList && followInfoList.length > 0 ? (
          followInfoList.map((item, index) => (
            <TableCard
              key={index}
              title={item.Entity_Name}
              mobile={item.Mobile_Number}
              email={item.Email}
            />
          ))
        ) : (
          <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: '500'}}>
            No data found
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FollowUps;
