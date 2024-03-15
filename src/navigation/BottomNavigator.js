import React from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
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
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: '#fff',
          tabBarLabelStyle: {fontSize: 11, marginBottom: 5},
        })}
        initialRouteName="Dashboard">
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
            tabBarIcon: ({focused}) => {
              const icon = focused
                ? require('../Assets/Images/home-icon-focused.png')
                : require('../Assets/Images/home-icon.png');
              return (
                <Image
                  source={icon}
                  style={{width: 18, height: 18, tintColor: '#06b6df'}}
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
            tabBarIcon: ({focused}) => {
              const icon = focused
                ? require('../Assets/Images/calendar-icon-focused.png')
                : require('../Assets/Images/calendar-icon.png');
              return (
                <Image
                  source={icon}
                  style={{width: 18, height: 18, tintColor: '#06b6df'}}
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
            tabBarIcon: ({focused}) => {
              const icon = focused
                ? require('../Assets/Images/customer-care-icon-focused.png')
                : require('../Assets/Images/customer-care-icon.png');
              return (
                <Image
                  source={icon}
                  style={{width: 18, height: 18, tintColor: '#06b6df'}}
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
            tabBarIcon: ({focused}) => {
              const icon = focused
                ? require('../Assets/Images/setting-line-icon-focused.png')
                : require('../Assets/Images/setting-line-icon.png');
              return (
                <Image
                  source={icon}
                  style={{width: 18, height: 18, tintColor: '#06b6df'}}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabStack;
