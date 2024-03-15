import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screen/splashComponent/splash';
import Login from '../screen/loginComponent/login';
import ForgotPassword from '../screen/forgotComponent/forgot';
import DrawerStack from './DrawerNavigator';
import TabStack from './BottomNavigator';
import Dashboard from '../screen/dashBoardComponent/dashboard';
import Account from '../screen/accountComponent/account';
import AddNewAccount from '../screen/addNewAccountComponent/addNewAccount';
import Contact from '../screen/contactComponent/contact';
import AddNewContact from '../screen/addNewContactComponent/addNewContact';
import AddNewLead from '../screen/addNewLeadComponent/addNewLead';
import LeadList from '../screen/leadListComponent/leadList';
import FollowUps from '../screen/followupComponent/followUps';
import GlobalSearch from '../screen/globalSearchComponent/globalSearch';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="DrawerStack" component={DrawerStack} />
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="Home" component={Dashboard} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="AddNewAccount" component={AddNewAccount} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="AddNewContact" component={AddNewContact} />
      <Stack.Screen name="AddNewLead" component={AddNewLead} />
      <Stack.Screen name="LeadList" component={LeadList} />
      <Stack.Screen name="FollowUps" component={FollowUps} />
      <Stack.Screen name="GlobalSearch" component={GlobalSearch} />
    </Stack.Navigator>
  );
};

export default AuthStack;
