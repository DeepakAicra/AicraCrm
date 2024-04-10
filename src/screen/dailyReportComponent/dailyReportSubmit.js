import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';

const DailyReportSubmit = ({navigation}) => {
  const [accountCrt, setAccountCrt] = useState('');
  const [taskAssign, setTaskAssign] = useState('');
  const [taskComplete, setTaskComplete] = useState('');
  const [taskPending, setTaskPending] = useState('');
  const [inTime, setInTime] = useState('');
  const [outTime, setOutTime] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [remarks, setRemarks] = useState('');
  const [followup, setFollowup] = useState('');
  const [totalLead, setTotalLead] = useState('');
  const [empId, setEmpId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [name, setName] = useState('');

  // console.log(companyId);
  const getUserData = async () => {
    const value = await AsyncStorage.getItem('userId');
    const companyValue = await AsyncStorage.getItem('companyId');
    const userName = await AsyncStorage.getItem('loginName');
    setEmpId(value);
    setCompanyId(companyValue);
    setName(userName);
  };

  useEffect(() => {
    getUserData();
    axios({
      url: `${API_URL}final_submit_info?empid=${empId}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.status == true) {
          const reportData = response.data.dash_resp;
          // Set the state variables with the values from reportData
          setAccountCrt(reportData.Total_Account_Created || '');
          setTaskAssign(reportData.Total_Task || '');
          setTaskComplete(reportData.Total_Task_Complete || '');
          setTaskPending(reportData.Total_Tasks_Pending || '');
          setInTime(reportData.Office_In_Time || '');
          setOutTime(reportData.Office_Out_Time || '');
          setFollowup(reportData.Total_Follow_up || '');
          setTotalLead(reportData.Total_Lead || '');
        }
      })
      .catch(error => console.log(error));
  }, [empId]);

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append('emp_id', empId);
    formData.append('companyid', companyId);
    formData.append('name', name);
    formData.append('total_account_created', accountCrt);
    formData.append('total_task', taskAssign);
    formData.append('total_complete_task', taskComplete);
    formData.append('total_pending_task', taskPending);
    formData.append('officeintime', inTime);
    formData.append('officeouttime', outTime);
    formData.append('total_followup', followup);
    formData.append('total_lead', totalLead);
    formData.append('remarks', remarks);
    axios({
      url: API_URL + 'final_submit',
      method: 'post',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.status) {
          Alert.alert('Details saved successfully', '', [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]);
        } else {
          Alert.alert('Sorry! Details not Saved.');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <Header
          backgroundColor={'#054767'}
          iconName={'chevron-left'}
          title={'Daily Report Submit'}
          textColor={'#ffffff'}
          onPress={() => navigation.goBack()}
        />
        <ScrollView style={styles.mainView}>
          <Text style={styles.titleStyle}>All Report</Text>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Total Account Created: *</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                editable={false}
                placeholder="--0--"
                placeholderTextColor={'grey'}
                value={accountCrt}
                onChangeText={setAccountCrt}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Total Task Assign: *</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                editable={false}
                placeholder="--0--"
                placeholderTextColor={'grey'}
                value={taskAssign}
                onChangeText={setTaskAssign}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Total Complete Task: *</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                editable={false}
                placeholder="--0--"
                placeholderTextColor={'grey'}
                value={taskComplete}
                onChangeText={setTaskComplete}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Total Pending Task: *</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                editable={false}
                placeholder="--0--"
                placeholderTextColor={'grey'}
                value={taskPending}
                onChangeText={setTaskPending}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Office In Time: *</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                editable={false}
                placeholder="--0--"
                placeholderTextColor={'grey'}
                value={inTime}
                onChangeText={setInTime}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Office Out Time: *</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                editable={false}
                placeholder="--0--"
                placeholderTextColor={'grey'}
                value={outTime}
                onChangeText={setOutTime}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Date: *</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                editable={false}
                placeholder="--0--"
                placeholderTextColor={'grey'}
                value={date}
                onChangeText={setDate}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Month: *</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                editable={false}
                placeholder="--0--"
                placeholderTextColor={'grey'}
                value={month}
                onChangeText={setMonth}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <Text style={styles.titleStyle}>Total Time: 0 hrs 27 min 6 sec</Text>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Full Day Work Remarks: *</Text>
            <View style={styles.multiLineView}>
              <TextInput
                multiline
                numberOfLines={3}
                maxLength={40}
                placeholder="Remarks"
                value={remarks}
                onChangeText={setRemarks}
                placeholderTextColor={'grey'}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DailyReportSubmit;
