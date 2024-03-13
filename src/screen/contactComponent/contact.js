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
import axios from 'axios';
import {API_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataTable} from 'react-native-paper';

const Contact = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [tableList, setTableList] = useState([]);
  const [contactInfoList, setContactInfoList] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const data = [
    {id: 1, name: 'Deepak Gupta', age: 28, email: 'deepak@example.com'},
    {id: 2, name: 'Deepak Gupta', age: 28, email: 'deepak@example.com'},
    {id: 3, name: 'Deepak Gupta', age: 28, email: 'deepak@example.com'},
    {id: 4, name: 'Deepak Gupta', age: 28, email: 'deepak@example.com'},
    {id: 5, name: 'Deepak Gupta', age: 28, email: 'deepak@example.com'},
    {id: 6, name: 'Deepak Gupta', age: 28, email: 'deepak@example.com'},
    {id: 7, name: 'Deepak Gupta', age: 28, email: 'deepak@example.com'},
    // Add more data objects as needed
  ];

  const getUserData = async () => {
    const value = await AsyncStorage.getItem('userId');
    setEmpId(value);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    axios({
      url: `${API_URL}Contact_List?empid=${empId}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.status == true) {
          setTableList(response.data.Contact_List_Data);
          // console.log(response.data.Contact_List_Data);
        }
      })
      .catch(error => console.log(error));

    axios({
      url: `${API_URL}Contacts_Information?empid=${empId}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.error === false) {
          setContactInfoList(response.data.Contacts_Information);
          // console.log(response.data.Contacts_Information);
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          // backgroundColor={'#054767'}
          iconName={'chevron-left'}
          title={'Contact'}
          textColor={'#ffffff'}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.headView}>
              <Text style={styles.txtStyle}>Contact</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddNewContact')}
                style={styles.addButtonStyle}>
                <Text style={styles.addTxtStyle}>Add New Account</Text>
              </TouchableOpacity>
            </View>
            {/* <ScrollView horizontal>
            {Object.entries(contactInfoList).map(
              ([title, value]) =>
                value && (
                  <Square key={title} title={title} value={value.toString()} />
                ),
            )}
          </ScrollView> */}
            <ScrollView horizontal>
              {contactInfoList ? (
                <Square
                  title="Contact Added Today"
                  value={contactInfoList.Contacts_Added_Today}
                />
              ) : null}
              {contactInfoList ? (
                <Square
                  title="Contact Added This Week"
                  value={contactInfoList.Contacts_Added_This_Week}
                />
              ) : null}
              {contactInfoList ? (
                <Square
                  title="Contact Added Today Month"
                  value={contactInfoList.Contacts_Added_This_Month}
                />
              ) : null}
              {contactInfoList ? (
                <Square
                  title="Contact Added Today Year"
                  value={contactInfoList.Contacts_Added_This_Year}
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

export default Contact;
