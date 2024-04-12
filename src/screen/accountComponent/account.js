import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  Pressable,
} from 'react-native';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import Square from '../../component/cards/cards';
import axios from 'axios';
import {API_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TableCard from '../../component/tableCards';

const Account = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [tableList, setTableList] = useState([]);
  const [accountInfoList, setAccountInfoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllEntries, setShowAllEntries] = useState(false);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        setEmpId(value);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (empId) {
      fetchData();
    }
  }, [empId]);

  const fetchData = async () => {
    try {
      const [accountListResponse, accountInfoResponse] = await Promise.all([
        axios.get(`${API_URL}Account_List?empid=${empId}`),
        axios.get(`${API_URL}Account_Information?empid=${empId}`),
      ]);

      handleAccountListResponse(accountListResponse);
      handleAccountInfoResponse(accountInfoResponse);
    } catch (error) {
      console.log('Error fetching account data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountListResponse = response => {
    if (response.data.status) {
      setTableList(response.data.account_data);
    } else {
      console.log('Error in account list response:', response.data.error);
    }
  };

  const handleAccountInfoResponse = response => {
    if (response.data.error === false) {
      setAccountInfoList(response.data.Account_Information);
    } else {
      console.log(
        'Error in account info response:',
        response.data.error_message,
      );
    }
  };

  const handleLeadEntriesPress = () => {
    setShowAllEntries(true);
  };

  const handleCall = mobileNumber => {
    Linking.openURL(`tel:${mobileNumber}`);
  };

  const handleSendMail = emailAddress => {
    Linking.openURL(`mailto:${emailAddress}`);
  };

  const handleWhatsApp = mobileNumber => {
    Linking.openURL(`whatsapp://send?text=hello&phone=${mobileNumber}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
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
              {accountInfoList && (
                <>
                  <Square
                    title="Account Added Today"
                    value={accountInfoList.Account_Added_Today}
                  />
                  <Square
                    title="Account Added Week"
                    value={accountInfoList.Account_Added_This_Week}
                  />
                  <Square
                    title="Account Added Month"
                    value={accountInfoList.Account_Added_This_Month}
                  />
                  <Square
                    title="Account Added Year"
                    value={accountInfoList.Account_Added_This_Year}
                  />
                </>
              )}
            </ScrollView>
            <View style={styles.titleView}>
              <Text style={styles.accountList}>Account List</Text>
            </View>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e61789" />
              </View>
            ) : (
              <>
                {tableList.length > 0 ? (
                  <>
                    {showAllEntries
                      ? tableList.map((item, index) => (
                          <Pressable
                            key={index}
                            onPress={() =>
                              navigation.navigate('AccountSelectedDetails', {
                                selectedItem: item,
                              })
                            }>
                            <TableCard
                              title={item.Entity_Name}
                              mobile={item.Mobile_Number}
                              email={item.Email}
                              call={() => handleCall(item.Mobile_Number)}
                              sendMail={() => handleSendMail(item.Email)}
                              whatsApp={() =>
                                handleWhatsApp(item.Mobile_Number)
                              }
                            />
                          </Pressable>
                        ))
                      : tableList.slice(0, 10).map((item, index) => (
                          <Pressable
                            key={index}
                            onPress={() =>
                              navigation.navigate('AccountSelectedDetails', {
                                selectedItem: item,
                              })
                            }>
                            <TableCard
                              title={item.Entity_Name}
                              mobile={item.Mobile_Number}
                              email={item.Email}
                              call={() => handleCall(item.Mobile_Number)}
                              sendMail={() => handleSendMail(item.Email)}
                              whatsApp={() =>
                                handleWhatsApp(item.Mobile_Number)
                              }
                            />
                          </Pressable>
                        ))}
                  </>
                ) : (
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 18,
                      fontWeight: '500',
                      color: 'red',
                    }}>
                    No data found
                  </Text>
                )}
              </>
            )}
            <TouchableOpacity
              style={styles.seeMoreTouch}
              onPress={handleLeadEntriesPress}>
              <Text style={styles.seeMoreTxt}>See More...</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Account;
