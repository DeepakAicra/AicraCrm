import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import TableCard from '../../component/tableCards';

const LeadList = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [leadDataList, setLeadDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const value = await AsyncStorage.getItem('userId');
    setEmpId(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      let formData = new FormData();
      formData.append('empid', empId);
      try {
        const response = await axios.get(API_URL + 'Lead_List', {
          data: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.status === true) {
          setLeadDataList(response.data.lead_data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [empId]);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={'#054767'}
        iconName={'chevron-left'}
        title={'Lead List'}
        textColor={'#ffffff'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#e61789" />
        ) : (
          leadDataList.map((item, index) => (
            <TableCard
              key={index}
              title={item.Entity_Name}
              mobile={item.Mobile_Number}
              email={item.Email}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default LeadList;
