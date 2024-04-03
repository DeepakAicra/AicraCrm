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
import {useRoute} from '@react-navigation/native';

const AddNewContact = ({navigation}) => {
  const [id, setId] = useState('');
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
  const {
    params: {item},
  } = useRoute();

  useEffect(() => {
    setId(item.id);
    setName(item.name);
    setOrganization(item.organization);
    setEmail(item.email)
    setPhone(item.phoneno)
    setAltPhone(item.altphoneno)
    setFacebook(item.facebook)
    setLinkedin(item.linkedin)
    setTwitter(item.twitter)
    setRemarks(item.remarks)
    getUserData();
  }, []);


  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      setEmpId(value);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogin = () => {
    if (!name || !organization || !email || !phone) {
      Alert.alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('id', id);
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
      url: API_URL + 'Contact_Update',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        // console.log(response.data);
        if (response.data.status == true) {
          Alert.alert('Details updated successfully');
        } else {
          Alert.alert('Sorry! Details not updated.');
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('Server error:', error.response.data);
          Alert.alert('Server error. Please try again later.');
        } else if (error.request) {
          console.error('Network error:', error.request);
          Alert.alert('Network error. Please check your internet connection.');
        } else {
          console.error('Error:', error.message);
          Alert.alert('An error occurred. Please try again later.');
        }
      });
  };

  const handleCancel = () => {};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container}>
        <Header
          backgroundColor={'#054767'}
          iconName={'chevron-left'}
          title={'Add Contact'}
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
            <View style={styles.multiLineView}>
              <TextInput
                placeholder="--Enter Remarks--"
                placeholderTextColor={'grey'}
                keyboardType="name-phone-pad"
                editable
                multiline
                numberOfLines={3}
                maxLength={40}
                value={remarks}
                onChangeText={setRemarks}
                style={{padding: 10}}
              />
            </View>
          </View>
          <View style={styles.combineButtonView}>
            <TouchableOpacity onPress={handleLogin} style={styles.firstButton}>
              <Text style={styles.firstButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.secondButton}>
              <Text style={styles.secondButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddNewContact;
