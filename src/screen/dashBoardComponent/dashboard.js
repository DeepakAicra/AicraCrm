import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Square from '../../component/cards/cards';
import ClockSquare from '../../component/clockCard/clockCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';

const Dashboard = () => {
  const navigation = useNavigation();
  const [empId, setEmpId] = useState('');
  const [superId, setSuperId] = useState('');
  const [superVisorList, setSuperVisorList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [leaveList, setLeaveList] = useState([]);

  const getUserData = async () => {
    const sprIdvalue = await AsyncStorage.getItem('supervisor_id');
    const value = await AsyncStorage.getItem('userId');
    setSuperId(sprIdvalue);
    setEmpId(value);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    axios({
      url: `${API_URL}Find_Supervisor?supervisor_id=${superId}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.error === 'false') {
          setSuperVisorList(response.data.users);
          // console.log(response.data.users);
        }
      })
      .catch(error => console.log(error));

    axios({
      url: `${API_URL}Dashboard?empid=${empId}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.status === true) {
          setDataList(response.data.dash_resp);
          // console.log(response.data.dash_resp);
        }
      })
      .catch(error => console.log(error));

    axios({
      url: `${API_URL}Leave_Balances?empid=${empId}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.status === true) {
          setLeaveList(response.data.Leave_Balances_Data);
          // console.log(response.data.Leave_Balances_Data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          backgroundColor={'#054767'}
          iconName={'menu'}
          nextIconName={'bell-outline'}
          againIconName={'search'}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <View style={{flexDirection: 'row', margin: 10}}>
          <Image
            source={require('../../Assets/Images/logo.png')}
            style={styles.userImage}
          />
          <View style={{marginHorizontal: 10, justifyContent: 'center'}}>
            <Text style={styles.titleTxtStyle}>Welcome, Guest</Text>
            <Text style={styles.titleTxtStyle}>Employee Code : AU0055</Text>
            {superVisorList && superVisorList.length > 0 ? (
              <Text style={styles.titleTxtStyle}>
                Supervisor : {superVisorList[0].name}
              </Text>
            ) : (
              <Text>No Supervisor data available</Text>
            )}
          </View>
        </View>
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.nextMainView}>
              <View style={styles.titleView}>
                <Text style={{fontSize: 16, fontWeight: 500, color: 'white'}}>
                  Working Hours: 00 hours 34 min
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#06b6df',
                    }}>
                    View Attendance
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <ScrollView horizontal>
                {Object.entries(dataList).map(
                  ([title, value]) =>
                    value && (
                      <Square
                        key={title}
                        title={title}
                        value={value.toString()}
                      />
                    ),
                )}
              </ScrollView> */}
              <ScrollView horizontal>
                {dataList ? (
                  <Square title="Today Lead" value={dataList.Today_Lead} />
                ) : null}
                {dataList ? (
                  <Square
                    title="Today Followup"
                    value={dataList.Today_Followup}
                  />
                ) : null}
                {dataList ? (
                  <Square
                    title="Today Task Assign"
                    value={dataList.Today_Task_Assign}
                  />
                ) : null}
                {dataList ? (
                  <Square
                    title="Total Task Assign"
                    value={dataList.Total_Task_Assign}
                  />
                ) : null}
                {dataList ? (
                  <Square
                    title="Total Task Complete"
                    value={dataList.Total_Task_Complete}
                  />
                ) : null}
                {dataList ? (
                  <Square
                    title="Total Metting"
                    value={dataList.Total_Metting}
                  />
                ) : null}
                {dataList ? (
                  <Square title="Outdoor Meet" value={dataList.Outdoor_Meet} />
                ) : null}
                {dataList ? (
                  <Square title="Virtual Meet" value={dataList.Virtual_Meet} />
                ) : null}
                {dataList ? (
                  <Square title="New Call" value={dataList.New_Call} />
                ) : null}
                {dataList ? (
                  <Square title="Total Lead" value={dataList.Total_Lead} />
                ) : null}
                {dataList ? (
                  <Square
                    title="Total Account"
                    value={dataList.Total_Account}
                  />
                ) : null}
                {dataList ? (
                  <Square
                    title="Lead Count Visit Tomorrow"
                    value={dataList.lead_count_visit_tomorrow}
                  />
                ) : null}
                {dataList ? (
                  <Square title="Outdoor Meet" value={dataList.outdoor_meet} />
                ) : null}
                {dataList ? (
                  <Square title="Virtual Meet" value={dataList.virtual_meet} />
                ) : null}
                {dataList ? (
                  <Square title="New Call" value={dataList.new_call} />
                ) : null}
                {dataList ? (
                  <Square title="Total Leave" value={dataList.total_leave} />
                ) : null}
                {dataList ? (
                  <Square
                    title="Total Present Day"
                    value={dataList.Total_Present_Day}
                  />
                ) : null}
                {dataList ? (
                  <Square
                    title="Total Achievements"
                    value={dataList.total_achievements}
                  />
                ) : null}
              </ScrollView>
              <View style={styles.titleView}>
                <Text style={{fontSize: 18, fontWeight: 500, color: 'white'}}>
                  Account Details
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#06b6df',
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal>
                <Square
                  title="Account Added Today"
                  value="0"
                  onPress={() => {}}
                />
                <Square
                  title="Account Added This"
                  value="0"
                  onPress={() => {}}
                />
                <Square title="Today's Followup" value="0" onPress={() => {}} />
              </ScrollView>
              <View style={styles.titleView}>
                <Text style={{fontSize: 18, fontWeight: 500, color: 'white'}}>
                  Task Details
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#06b6df',
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal>
                <Square title="Task Pending" value="0" onPress={() => {}} />
                <Square
                  title="Total Task Assign"
                  value="0"
                  onPress={() => {}}
                />
                <Square title="Today's Followup" value="0" onPress={() => {}} />
              </ScrollView>
              <View style={styles.titleView}>
                <Text style={{fontSize: 18, fontWeight: 500, color: 'white'}}>
                  Leave Balance
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#06b6df',
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal>
                {leaveList ? (
                  <Square
                    title="Casual Leave"
                    value={leaveList.causal_leave}
                    onPress={() => {}}
                  />
                ) : null}
                {leaveList ? (
                  <Square
                    title="Sick Leave"
                    value={leaveList.sick_leave}
                    onPress={() => {}}
                  />
                ) : null}
                {leaveList ? (
                  <Square
                    title="Vacation Leave"
                    value={leaveList.vacation_leave}
                  />
                ) : null}
              </ScrollView>
              <View style={styles.titleView}>
                <Text style={{fontSize: 18, fontWeight: 500, color: 'white'}}>
                  Monthly Working Report
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#06b6df',
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal>
                <ClockSquare title="WorkDays" value="15" onPress={() => {}} />
                <ClockSquare
                  title="Complementary Days"
                  value="10"
                  onPress={() => {}}
                />
                <ClockSquare
                  title="Working Hours"
                  value="120"
                  onPress={() => {}}
                />
              </ScrollView>
              <View style={styles.titleView}>
                <Text style={{fontSize: 18, fontWeight: 500, color: 'white'}}>
                  Revenue Target
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#06b6df',
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal>
                <ClockSquare
                  title="Web Clock In/Out"
                  value="0"
                  onPress={() => {}}
                />
                <ClockSquare title="Today Lead" value="0" onPress={() => {}} />
                <ClockSquare
                  title="Today's Followup"
                  value="0"
                  onPress={() => {}}
                />
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
