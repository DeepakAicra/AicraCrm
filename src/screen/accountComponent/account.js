import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import Square from '../../component/cards/cards';
import {DataTable} from 'react-native-paper';
import axios from 'axios';
import {API_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [tableList, setTableList] = useState([]);
  const [accountInfoList, setAccountInfoList] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const data = [
    {id: 1, name: 'Ravi Ranjan', age: 28, email: 'ravi.ranjan@example.com'},
    {id: 2, name: 'Deepak Gupta', age: 28, email: 'deepak@example.com'},
  ];

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      setEmpId(value);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountListResponse, accountInfoResponse] = await Promise.all([
          axios.get(`${API_URL}Account_List?empid=${empId}`),
          axios.get(`${API_URL}Account_Information?empid=${empId}`),
        ]);

        if (accountListResponse.data.status === true) {
          setTableList(accountListResponse.data.account_data);
        }

        if (accountInfoResponse.data.error === false) {
          setAccountInfoList(accountInfoResponse.data.Account_Information);
        }
      } catch (error) {
        console.log('Error fetching account data:', error);
      }
    };

    fetchData();
  }, [empId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          // backgroundColor={'#054767'}
          iconName={'chevron-left'}
          title={'Account'}
          textColor={'#ffffff'}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.headView}>
              <Text style={styles.txtStyle}>Account</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddNewAccount')}
                style={styles.addButtonStyle}>
                <Text style={styles.addTxtStyle}>Add New Account</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal>
              {accountInfoList ? (
                <Square
                  title="Account Added Today"
                  value={accountInfoList.Account_Added_Today}
                />
              ) : null}
              {accountInfoList ? (
                <Square
                  title="Account Added Week"
                  value={accountInfoList.Account_Added_This_Week}
                />
              ) : null}
              {accountInfoList ? (
                <Square
                  title="Account Added Month"
                  value={accountInfoList.Account_Added_This_Month}
                />
              ) : null}
              {accountInfoList ? (
                <Square
                  title="Account Added Year"
                  value={accountInfoList.Account_Added_This_Year}
                />
              ) : null}
            </ScrollView>
            <Text style={styles.entryTxt}>Show Entries</Text>
            <DataTable style={{backgroundColor: '#ffffff'}}>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title>Id</DataTable.Title>
                <DataTable.Title numeric>Name</DataTable.Title>
                <DataTable.Title numeric>Age</DataTable.Title>
                <DataTable.Title numeric>Email</DataTable.Title>
              </DataTable.Header>
              {data
                .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                .map((row, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{row.id}</DataTable.Cell>
                    <DataTable.Cell numeric>{row.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{row.age}</DataTable.Cell>
                    <DataTable.Cell numeric>{row.email}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(data.length / itemsPerPage)}
                onPageChange={page => setPage(page)}
                label={`${page * itemsPerPage + 1}-${Math.min(
                  (page + 1) * itemsPerPage,
                  data.length,
                )} of ${data.length}`}
              />
            </DataTable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Account;
