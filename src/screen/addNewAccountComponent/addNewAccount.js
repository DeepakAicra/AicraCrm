import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';

const AddNewAccount = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const value = await AsyncStorage.getItem('userId');
    setEmpId(value);
  };

  const handleLogin = () => {
    let formData = new FormData();
    formData.append('emp_id', empId);
    formData.append('name', name);
    formData.append('organization', organization);
    formData.append('email', email);
    formData.append('phoneno', phone);
    formData.append('altphoneno', altPhone);
    formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('linkedin', linkedin);
    formData.append('remarks', remarks);
    axios({
      url: API_URL + 'New_Contact',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.error === false) {
          // console.log(response.data);
          Alert.alert('Details Update successfully');
        } 
        else {
          Alert.alert('Invalid Details !');
        }
      })
      .catch(error => console.log('Error fetching data:', error));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container}>
        <Header
          backgroundColor={'#054767'}
          iconName={'chevron-left'}
          title={'Add Account'}
          textColor={'#ffffff'}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainView}>
          <Text style={styles.titleStyle}>Name & Organization</Text>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Name</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="--Enter Full Name--"
                placeholderTextColor={'grey'}
                keyboardType="name-phone-pad"
                value={name}
                onChangeText={setName}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Organization</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="--Enter Organization Name--"
                placeholderTextColor={'grey'}
                keyboardType="name-phone-pad"
                value={organization}
                onChangeText={setOrganization}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <Text style={styles.titleStyle}>Contact Details</Text>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Email</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="--Enter Email--"
                placeholderTextColor={'grey'}
                keyboardType="name-phone-pad"
                value={email}
                onChangeText={setEmail}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Phone</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="--Enter Phone--"
                placeholderTextColor={'grey'}
                keyboardType="name-phone-pad"
                value={phone}
                onChangeText={setPhone}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Alt Phone</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="--Enter Alt Phone--"
                placeholderTextColor={'grey'}
                keyboardType="name-phone-pad"
                value={altPhone}
                onChangeText={setAltPhone}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Facebook</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="--Enter Facebook--"
                placeholderTextColor={'grey'}
                keyboardType="name-phone-pad"
                value={facebook}
                onChangeText={setFacebook}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Linkedin</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="--Enter Linkedin--"
                placeholderTextColor={'grey'}
                keyboardType="name-phone-pad"
                value={linkedin}
                onChangeText={setLinkedin}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Twitter</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="--Enter Twitter--"
                placeholderTextColor={'grey'}
                keyboardType="name-phone-pad"
                value={twitter}
                onChangeText={setTwitter}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <Text style={styles.titleStyle}>Additional Information</Text>
          <View style={styles.selectedItemView}>
            <Text style={styles.titleTextBox}>Remarks</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="--Enter Remarks--"
                placeholderTextColor={'grey'}
                keyboardType="name-phone-pad"
                multiline
                numberOfLines={4}
                // maxLength={40}
                value={remarks}
                onChangeText={setRemarks}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.combineButtonView}>
            <TouchableOpacity onPress={handleLogin} style={styles.firstButton}>
              <Text style={styles.firstButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondButton}>
              <Text style={styles.secondButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddNewAccount;
