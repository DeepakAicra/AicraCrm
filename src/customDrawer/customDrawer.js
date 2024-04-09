import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Assets/Theme/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const [focus, setFocus] = useState('1');
  const [NestedDrawerItem, setNestedDrawerItem] = useState(false);
  const [LeadsDrawerItem, setLeadsDrawerItem] = useState(false);
  const [NestedDrawerItms, setNestedDrawerItms] = useState(false);

  const NestedDrawerItemFun = () => {
    if (NestedDrawerItem == true) {
      setNestedDrawerItem(false);
    } else {
      setNestedDrawerItem(true);
    }
  };

  const LeadsDrawerItemFunction = () => {
    if (LeadsDrawerItem == true) {
      setLeadsDrawerItem(false);
    } else {
      setLeadsDrawerItem(true);
    }
  };

  const NestedDrawerItemFunction = () => {
    if (NestedDrawerItms == true) {
      setNestedDrawerItms(false);
    } else {
      setNestedDrawerItms(true);
    }
  };

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure to logout Application?',
      [
        {
          text: 'No',
          onPress: () => console.log('--> No'),
        },
        {
          text: 'Yes',
          onPress: () => {
            AsyncStorage.clear();
            AsyncStorage.removeItem('userId');
            AsyncStorage.removeItem('loginId');
            AsyncStorage.removeItem('loginName');
            BackHandler.exitApp();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: '#054767',
        }}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Image
            source={require('../Assets/Images/logo.png')}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              borderWidth: 2,
              borderColor: '#ffffff',
            }}
          />
          <View
            style={{
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
              }}>
              AICRA CRM
            </Text>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 2}}>
          <DrawerItemList {...props} />
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor={Colors.azure}
            icon={({color}) => (
              <Feather name="database" color={color} size={22} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Accounts
              </Text>
            )}
            onPress={() => {
              setFocus(1);
              props.navigation.navigate('Account');
            }}
          />
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <Octicons name="device-mobile" color={color} size={22} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Contacts
              </Text>
            )}
            onPress={() => {
              setFocus(1);
              props.navigation.navigate('Contact');
            }}
          />
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <MaterialIcons name="person-outline" color={color} size={22} />
            )}
            label={({color}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginLeft: -20,
                  }}>
                  Leads
                </Text>
                {LeadsDrawerItem == true && (
                  <AntDesign name="up" color={color} size={18} />
                )}
                {LeadsDrawerItem == false && (
                  <AntDesign name="down" color={color} size={18} />
                )}
              </View>
            )}
            onPress={() => {
              setFocus(1);
              LeadsDrawerItemFunction();
            }}
          />
          {LeadsDrawerItem == true && (
            <DrawerItem
              //   focused={focus == 1 ? true : false}
              pressColor={Colors.azure}
              activeTintColor="#b30059"
              label={({focused, color}) => (
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Add New Lead
                </Text>
              )}
              onPress={() => {
                setFocus(1);
                props.navigation.navigate('AddNewLead');
              }}
            />
          )}
          {LeadsDrawerItem == true && (
            <DrawerItem
              //   focused={focus == 1 ? true : false}
              pressColor={Colors.azure}
              activeTintColor="#b30059"
              label={({focused, color}) => (
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Lead List
                </Text>
              )}
              onPress={() => {
                setFocus(1);
                props.navigation.navigate('LeadList');
              }}
            />
          )}
          {LeadsDrawerItem == true && (
            <DrawerItem
              //   focused={focus == 1 ? true : false}
              pressColor={Colors.azure}
              activeTintColor="#b30059"
              label={({focused, color}) => (
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Follow ups
                </Text>
              )}
              onPress={() => {
                setFocus(1);
                props.navigation.navigate('FollowUps');
              }}
            />
          )}
          {/* {LeadsDrawerItem == true && (
            <DrawerItem
              //   focused={focus == 1 ? true : false}
              pressColor={Colors.azure}
              activeTintColor="#b30059"
              label={({focused, color}) => (
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Global Search
                </Text>
              )}
              onPress={() => {
                setFocus(1);
                props.navigation.navigate('GlobalSearch');
              }}
            />
          )} */}
          {/* <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <Octicons name="tasklist" color={color} size={22} />
            )}
            label={({color}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginLeft: -20,
                  }}>
                  Tasks
                </Text>
                {NestedDrawerItem == true && (
                  <AntDesign name="up" color={color} size={18} />
                )}
                {NestedDrawerItem == false && (
                  <AntDesign name="down" color={color} size={18} />
                )}
              </View>
            )}
            onPress={() => {
              setFocus(1);
              NestedDrawerItemFun();
            }}
          />
          {NestedDrawerItem == true && (
            <DrawerItem
              //   focused={focus == 1 ? true : false}
              pressColor={Colors.azure}
              activeTintColor="#b30059"
              label={({focused, color}) => (
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  My Task List
                </Text>
              )}
              onPress={() => {
                setFocus(1);
                // props.navigation.navigate('justJoinedMatches');
              }}
            />
          )}
          {NestedDrawerItem == true && (
            <DrawerItem
              //   focused={focus == 1 ? true : false}
              pressColor={Colors.azure}
              activeTintColor="#b30059"
              label={({focused, color}) => (
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Assign Task List
                </Text>
              )}
              onPress={() => {
                setFocus(1);
                // props.navigation.navigate('dailyRecommendation');
              }}
            />
          )} */}

          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <Ionicons name="calendar-clear-outline" color={color} size={22} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Attendance
              </Text>
            )}
            onPress={() => {
              setFocus(1);
              props.navigation.navigate('Attendance');
            }}
          />

          {/* <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <MaterialIcons name="person-add-alt-1" color={color} size={22} />
            )}
            label={({color}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginLeft: -20,
                  }}>
                  WFH
                </Text>
                {NestedDrawerItms == true && (
                  <AntDesign name="up" color={color} size={18} />
                )}
                {NestedDrawerItms == false && (
                  <AntDesign name="down" color={color} size={18} />
                )}
              </View>
            )}
            onPress={() => {
              setFocus(1);
              NestedDrawerItemFunction();
            }}
          />
          {NestedDrawerItms == true && (
            <DrawerItem
              //   focused={focus == 1 ? true : false}
              pressColor={Colors.azure}
              activeTintColor="#b30059"
              label={({focused, color}) => (
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Apply for WFH
                </Text>
              )}
              onPress={() => {
                setFocus(1);
                // props.navigation.navigate('interestReceived');
              }}
            />
          )}
          {NestedDrawerItms == true && (
            <DrawerItem
              //   focused={focus == 1 ? true : false}
              pressColor={Colors.azure}
              activeTintColor="#b30059"
              label={({focused, color}) => (
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  WFH List
                </Text>
              )}
              onPress={() => {
                setFocus(1);
                // props.navigation.navigate('interestSent');
              }}
            />
          )}
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <MaterialIcons name="person-outline" color={color} size={22} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Leave
              </Text>
            )}
            onPress={() => {
              setFocus(1);
              // props.navigation.navigate('privacyPolicy');
            }}
          />
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <MaterialIcons name="currency-rupee" color={color} size={22} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Payroll
              </Text>
            )}
            onPress={() => {
              setFocus(1);
              // props.navigation.navigate('privacyPolicy');
            }}
          />
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <MaterialIcons name="people-alt" color={color} size={22} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Team
              </Text>
            )}
            onPress={() => {
              setFocus(1);
              // props.navigation.navigate('aboutUs');
            }}
          />
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <MaterialCommunityIcons
                name="note-outline"
                color={color}
                size={22}
              />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Claim
              </Text>
            )}
            onPress={() => {
              setFocus(1);
              // props.navigation.navigate('termsCondition');
            }}
          />
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <Octicons name="tasklist" color={color} size={22} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Requirement
              </Text>
            )}
            onPress={() => {
              setFocus(1);
              // props.navigation.navigate('reportProblem');
            }}
          />
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <MaterialIcons name="bar-chart" color={color} size={22} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Reports
              </Text>
            )}
            onPress={() => {
              setFocus(1);
              // props.navigation.navigate('contactUs');
            }}
          />
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <Ionicons name="settings-sharp" color={color} size={22} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Settings
              </Text>
            )}
            onPress={() => {
              setFocus(1);
              // props.navigation.navigate('settings');
            }}
          /> */}
          <DrawerItem
            // focused={focus == 1 ? true : false}
            pressColor={Colors.azure}
            activeTintColor="#b30059"
            icon={({color}) => (
              <Ionicons name="exit-outline" color={color} size={22} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: -20,
                }}>
                Logout
              </Text>
            )}
            onPress={logout}
          />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawer;
