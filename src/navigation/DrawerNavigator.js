import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../customDrawer/customDrawer';
import Colors from '../Assets/Theme/Theme';
import TabStack from './BottomNavigator';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="TabStack"
      drawerType="slide"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.azure,
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: 'Roboto-Medium',
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen
        name="TabStack"
        component={TabStack}
        options={{
          drawerLabel: "DashBoard",
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
