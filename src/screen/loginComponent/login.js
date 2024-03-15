import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {API_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }
    return null;
  };

  const handleLogin = () => {
    setLoading(true);
    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword) {
      let formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      axios({
        url: API_URL + 'login',
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          setLoading(false);
          if (response.data.error === false) {
            AsyncStorage.setItem('userId', response.data.message.emp_id);
            AsyncStorage.setItem('loginId', response.data.message.id);
            AsyncStorage.setItem(
              'supervisor_id',
              response.data.message.supervisor_id,
            );
            navigation.navigate('DrawerStack');
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    } else {
      setLoading(false);
      Alert.alert(checkPassword);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container}>
        <View style={styles.mainView}>
          <Image
            source={require('../../Assets/Images/logo.png')}
            style={styles.logoStyle}
          />
          <Text style={styles.title}>AICRA CRM</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email Address*"
              placeholderTextColor={'white'}
              value={email}
              onChangeText={text => handleCheckEmail(text)}
              keyboardType={'email-address'}
              autoCapitalize="none"
              style={styles.textInputStyle}
            />
          </View>
          {checkValidEmail ? (
            <Text style={styles.textFailed}>Wrong email format</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password*"
              placeholderTextColor={'white'}
              value={password}
              secureTextEntry={seePassword}
              onChangeText={text => setPassword(text)}
              style={styles.passwordInputStyle}
            />
            <TouchableOpacity
              style={styles.wrapperIcon}
              onPress={() => setSeePassword(!seePassword)}>
              <Ionicons
                name={seePassword ? 'eye-off' : 'eye'}
                color={'white'}
                size={25}
              />
            </TouchableOpacity>
          </View>
          {email == '' || password == '' || checkValidEmail == true ? (
            <TouchableOpacity
              disabled
              onPress={handleLogin}
              style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          )}
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#e61789" />
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
