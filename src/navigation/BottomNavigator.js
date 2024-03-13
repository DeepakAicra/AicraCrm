import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../screen/dashBoardComponent/dashboard';

const Tab = createBottomTabNavigator();

const Screen2 = () => (
  <View>
    <Text>Screen2</Text>
  </View>
);

const Screen3 = () => (
  <View>
    <Text>Screen3</Text>
  </View>
);

const Screen4 = () => (
  <View>
    <Text>Screen4</Text>
  </View>
);

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: '#fff',
      })}
      initialRouteName="Feed">
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: '#012131',
          },
          tabBarIcon: tabInfo => {
            return (
              <Image
                source={require('../Assets/Images/home-icon.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: tabInfo.focused ? 'white' : '#06B6DF',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Screen2}
        options={{
          headerShown: false,
          tabBarLabel: 'Schedule',
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: '#012131',
          },
          tabBarIcon: tabInfo => {
            return (
              <Image
                source={require('../Assets/Images/calendar-icon.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: tabInfo.focused ? 'white' : '#06B6DF',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Followup"
        component={Screen3}
        options={{
          headerShown: false,
          tabBarLabel: 'Followup',
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: '#012131',
          },
          tabBarIcon: tabInfo => {
            return (
              <Image
                source={require('../Assets/Images/customer-care-icon.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: tabInfo.focused ? 'white' : '#06B6DF',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Screen4}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: '#012131',
          },
          tabBarIcon: tabInfo => {
            return (
              <Image
                source={require('../Assets/Images/setting-line-icon.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: tabInfo.focused ? 'white' : '#06B6DF',
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
