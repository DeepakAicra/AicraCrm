import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import TableCard from '../../component/tableCard/tableCards';

const LeadList = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [leadDataList, setLeadDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllEntries, setShowAllEntries] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem('userId');
        if (value !== null) {
          setEmpId(value);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await axios.get(`${API_URL}Lead_List?empid=${empId}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.status === true) {
          setLeadDataList(response.data.lead_data);
        }
      } catch (error) {
        console.error('Error fetching lead data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (empId) {
      fetchLeadData();
    }
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
        ) : leadDataList && leadDataList.length > 0 ? (
          leadDataList
            .slice(0, showAllEntries ? leadDataList.length : 10)
            .map((item, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate('LeadListSelectedDetails', {
                    selectedItem: item,
                  })
                }>
                <TableCard
                  title={item.Entity_Name}
                  mobile={item.Mobile_Number}
                  email={item.Email}
                  call={() => handleCall(item.phoneno)}
                  sendMail={() => handleSendMail(item.email)}
                  whatsApp={() => handleWhatsApp(item.phoneno)}
                />
              </Pressable>
            ))
        ) : (
          <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: '500'}}>
            No data found
          </Text>
        )}
        {!showAllEntries && (
          <TouchableOpacity
            style={styles.seeMoreTouch}
            onPress={handleLeadEntriesPress}>
            <Text style={styles.seeMoreTxt}>See More...</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default LeadList;
