import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';

const LeadList = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [leadDataList, setLeadDataList] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const value = await AsyncStorage.getItem('userId');
    setEmpId(value);
  };

  useEffect(() => {
    let formData = new FormData();
    formData.append('empid', empId);
    axios({
      url: API_URL + 'Lead_List',
      method: 'get',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response.data.lead_data);
        if (response.data.status == true) {
          // setLeadDataList(response.data.lead_data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={'#054767'}
        iconName={'chevron-left'}
        title={'Lead List'}
        textColor={'#ffffff'}
        onPress={() => navigation.goBack()}
      />
      <Text>LeadList</Text>
    </View>
  );
};

export default LeadList;
