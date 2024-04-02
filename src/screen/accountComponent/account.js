import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import Square from '../../component/cards/cards';
import {DataTable} from 'react-native-paper';
import axios from 'axios';
import {API_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TableCard from '../../component/tableCards';

const Account = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [tableList, setTableList] = useState([]);
  const [accountInfoList, setAccountInfoList] = useState([]);

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
          console.log(accountListResponse.data.account_data);
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
            <Text style={styles.entryTxt}>Lead Entries</Text>
            {/* {tableList?.map((item, index) => (
              <TableCard
                key={index}
                title={item.Entity_Name}
                mobile={item.Mobile_Number}
                email={item.Email}
              />
            ))} */}
            {/* {tableList.length ? (
              <FlatList
                data={tableList}
                renderItem={({item}) => (
                  <TableCard
                    title={item.Entity_Name}
                    mobile={item.Mobile_Number}
                    email={item.Email}
                  />
                )}
              />
            ) : null} */}
            {tableList && tableList.Entity_Name && (
              <TableCard
                title={tableList.Entity_Name}
                mobile={tableList.Mobile_Number}
                email={tableList.Email}
              />
            )}
            {/* <TableCard
              title="Satendra kumar"
              mobile="7856235896"
              email="mrravi@email.com"
            />
            <TableCard
              title="Devendra Gupta"
              mobile="7856235896"
              email="mrravi@email.com"
            />
            <TableCard
              title="Amit Gupta"
              mobile="7856235896"
              email="mrravi@email.com"
            /> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Account;
