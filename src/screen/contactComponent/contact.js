import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
  Pressable
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../component/generalHeader/header';
import Square from '../../component/cards/cards';
import TableCard from '../../component/tableCard/tableCards';
import styles from './styles';
import {API_URL} from '../../config';

const Contact = ({navigation}) => {
  const [empId, setEmpId] = useState(null);
  const [tableList, setTableList] = useState([]);
  const [contactInfoList, setContactInfoList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllEntries, setShowAllEntries] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const value = await AsyncStorage.getItem('userId');
      setEmpId(value);
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (!empId) return;
    const fetchData = async () => {
      try {
        const contactListResponse = await axios.get(
          `${API_URL}Contact_List?empid=${empId}`,
        );
        if (contactListResponse.data.status === true) {
          setTableList(contactListResponse.data.Contact_List_Data);
        }

        const contactsInfoResponse = await axios.get(
          `${API_URL}Contacts_Information?empid=${empId}`,
        );
        if (contactsInfoResponse.data.error === false) {
          setContactInfoList(contactsInfoResponse.data.Contacts_Information);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [empId]);

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
                <Text style={styles.addTxtStyle}>Add New Contact</Text>
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
                  title="Contact Added This Month"
                  value={contactInfoList.Contacts_Added_This_Month}
                />
              ) : null}
              {contactInfoList ? (
                <Square
                  title="Contact Added This Year"
                  value={contactInfoList.Contacts_Added_This_Year}
                />
              ) : null}
            </ScrollView>
            <View style={styles.titleView}>
              <Text style={styles.CountactList}>Contact List</Text>
            </View>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e61789" />
              </View>
            ) : (
              <>
                {showAllEntries
                  ? tableList.map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() =>
                          navigation.navigate('ContactSelectedDetails', {
                            selectedItem: item,
                          })
                        }>
                        <TableCard
                          title={item.name}
                          mobile={item.phoneno}
                          email={item.email}
                          edit={() =>
                            navigation.navigate('EditUpdateContact', {item})
                          }
                          call={() => handleCall(item.phoneno)}
                          sendMail={() => handleSendMail(item.email)}
                          whatsApp={() => handleWhatsApp(item.phoneno)}
                        />
                      </Pressable>
                    ))
                  : tableList.slice(0, 10).map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() =>
                          navigation.navigate('ContactSelectedDetails', {
                            selectedItem: item,
                          })
                        }>
                        <TableCard
                          title={item.name}
                          mobile={item.phoneno}
                          email={item.email}
                          edit={() =>
                            navigation.navigate('EditUpdateContact', {item})
                          }
                          call={() => handleCall(item.phoneno)}
                          sendMail={() => handleSendMail(item.email)}
                          whatsApp={() => handleWhatsApp(item.phoneno)}
                        />
                      </Pressable>
                    ))}
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

export default Contact;
