import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Header from '../../component/header/header';
import axios from 'axios';
import {API_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({navigation}) => {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getUserData = async () => {
    const value = await AsyncStorage.getItem('userId');
    setEmpId(value);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const onSubmit = () => {
    let formData = new FormData();
    formData.append('empId', empId);
    formData.append('pass', password);
    formData.append('pass', confirmPassword);
    axios({
      url: API_URL + 'Change_Password',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response.data);
        if (response.data == true) {
          Alert.alert('Otp Send successfully');
          navigation.navigate();
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          title={'Forgot Password'}
          textColor={'#fefefe'}
          backgroundColor={'#054767'}
          onPress={() => {}}
        />
        <View style={styles.mainView}>
          <Text style={styles.txtStyle}>
            (Please enter Password no to reset password)
          </Text>
          <View style={styles.passwordView}>
            <View style={styles.passwordViewStyle}>
              <Text style={styles.passwordTxt}>Password</Text>
              <Text style={styles.starTxtStyle}>*</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Enter Password No"
                placeholderTextColor={'black'}
                keyboardType={'number-pad'}
                value={password}
                onChangeText={setPassword}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <View style={styles.passwordView}>
            <View style={styles.passwordViewStyle}>
              <Text style={styles.passwordTxt}>Confirm Password</Text>
              <Text style={styles.starTxtStyle}>*</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Enter Confirm Password No"
                placeholderTextColor={'black'}
                keyboardType={'number-pad'}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.textInputStyle}
              />
            </View>
          </View>
          <TouchableOpacity onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
