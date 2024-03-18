import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import axios from 'axios';
import {API_URL} from '../../config';

const AddNewAccount = ({navigation}) => {
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isIndustryModalVisible, setIndustryModalVisible] = useState(false);
  const [isAccountAssignedModalVisible, setAccountAssignedModalVisible] =
    useState(false);
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);
  const [isStateModalVisible, setStateModalVisible] = useState(false);
  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [isTitleModalVisible, setTitleModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountTypeList, setAccountTypeList] = useState([]);
  const [industryType, setIndustryType] = useState('');
  const [industryTypeList, setIndustryTypeList] = useState([]);
  const [services, setServices] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [country, setCountry] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [countryId, setCountryId] = useState();
  const [state, setState] = useState('');
  const [stateList, setStateList] = useState([]);
  const [stateId, setStateId] = useState();
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [websiteInfo, setWebsiteInfo] = useState('');
  const [poc, setPoc] = useState('');
  const [designation, setDesignation] = useState('');
  const [title, setTitle] = useState('');
  const [titleList, setTitleList] = useState([]);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [landline, setLandline] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [accountCrd, setAccountCrd] = useState('');
  const [account, setAccount] = useState('');
  const [accountList, setAccountList] = useState([]);
  const userType = 'Sales';

  const toggleAccoutModal = () => {
    if (!isAccountModalVisible) {
      axios({
        url: API_URL + 'Account_Type',
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data && response.data.status === true) {
            setAccountTypeList(response.data.data);
            setAccountModalVisible(!isAccountModalVisible);
            // console.log(response.data.data);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
  };

  const toggleIndustryModal = () => {
    if (!isIndustryModalVisible) {
      axios({
        url: API_URL + 'Industry',
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data && response.data.status === true) {
            setIndustryTypeList(response.data.Industry_Data);
            setIndustryModalVisible(!isIndustryModalVisible);
            // console.log(response.data.Industry_Data);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
  };

  const toggleCountryModal = () => {
    if (!isCountryModalVisible) {
      axios({
        url: API_URL + 'country',
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data && response.data.error === 'false') {
            setCountryList(response.data.users);
            setCountryModalVisible(!isCountryModalVisible);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
  };

  const toggleStateModal = () => {
    if (!isStateModalVisible) {
      axios({
        url: `${API_URL}getState?countryId=${countryId}`,
        method: 'get',
        headers: {
          Accept: 'Application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data.error === 'false') {
            // console.log(response.data.users);
            setStateList(response.data.users);
            setStateModalVisible(!isStateModalVisible);
          }
        })
        .catch(error => console.log(error));
    }
  };

  const toggleCityModal = () => {
    if (!isCityModalVisible) {
      axios({
        url: `${API_URL}getCity?state_id=${stateId}`,
        method: 'get',
        headers: {
          Accept: 'Application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log(response.data.users);
          if (response.data.error === 'false') {
            setCityList(response.data.users);
            setCityModalVisible(!isCityModalVisible);
          }
        })
        .catch(error => console.log(error));
    }
  };

  const toggleTitleModal = () => {
    if (!isTitleModalVisible) {
      axios({
        url: API_URL + 'Title_Type',
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data && response.data.status === true) {
            setTitleList(response.data.Title_Data);
            // console.log(response.data.Title_Data);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
    setTitleModalVisible(!isTitleModalVisible);
  };

  const toggleAccountAssignedModal = () => {
    if (!isAccountAssignedModalVisible) {
      axios({
        url: `${API_URL}User_List?usertype=${userType}`,
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data && response.data.error === 'false') {
            // console.log(response.data.users);
            setAccountList(response.data.users);
            setAccountAssignedModalVisible(!isAccountAssignedModalVisible);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
  };

  // const handleSubmit = () => {};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <Header
          backgroundColor={'#054767'}
          iconName={'chevron-left'}
          title={'Add New Account'}
          textColor={'#ffffff'}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Account Name*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="Type to search Company/Organization"
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={name}
                  onChangeText={setName}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Account Type</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setAccountModalVisible(false)}
                  onBackButtonPress={() => setAccountModalVisible(false)}
                  isVisible={isAccountModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleAccoutModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Select Account</Text>
                    </View>
                    {accountTypeList.length ? (
                      <FlatList
                        data={accountTypeList}
                        renderItem={({item}) => (
                          <Pressable
                            onPress={() => {
                              setAccountType(item);
                              setAccountModalVisible(false);
                            }}
                            style={styles.contentmainView}>
                            <Text style={styles.contentText}>{item}</Text>
                          </Pressable>
                        )}
                      />
                    ) : null}
                  </View>
                </Modal>
                <Pressable
                  onPress={toggleAccoutModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select Account Type--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={accountType}
                    onChangeText={setAccountType}
                    onPressIn={toggleAccoutModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.iconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Industry Type</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setIndustryModalVisible(false)}
                  onBackButtonPress={() => setIndustryModalVisible(false)}
                  isVisible={isIndustryModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleIndustryModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Select Industry</Text>
                    </View>
                    {industryTypeList.length ? (
                      <FlatList
                        data={industryTypeList}
                        renderItem={({item}) => (
                          <Pressable
                            onPress={() => {
                              setIndustryType(item);
                              setIndustryModalVisible(false);
                            }}
                            style={styles.contentmainView}>
                            <Text style={styles.contentText}>{item}</Text>
                          </Pressable>
                        )}
                      />
                    ) : null}
                  </View>
                </Modal>
                <Pressable
                  onPress={toggleIndustryModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select Industry Type--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={industryType}
                    onChangeText={setIndustryType}
                    onPressIn={toggleIndustryModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.iconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Services*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="Services"
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={services}
                  onChangeText={setServices}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>GST No*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="Enter GST No"
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={gstNo}
                  onChangeText={setGstNo}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Country</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setCountryModalVisible(false)}
                  onBackButtonPress={() => setCountryModalVisible(false)}
                  isVisible={isCountryModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleCountryModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Select Country</Text>
                    </View>
                    <ScrollView>
                      {countryList?.map((c, i) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setCountry(c.name);
                              setCountryId(c.id);
                              setCountryModalVisible(false);
                            }}
                            key={i}
                            style={styles.contentmainView}>
                            <Text style={styles.contentText}>{c.name}</Text>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </View>
                </Modal>
                <Pressable
                  onPress={toggleCountryModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select Country Type--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={country}
                    onChangeText={setCountry}
                    onPressIn={toggleCountryModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.iconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>State/Province</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setStateModalVisible(false)}
                  onBackButtonPress={() => setStateModalVisible(false)}
                  isVisible={isStateModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleStateModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Select State</Text>
                    </View>
                    <ScrollView>
                      {stateList?.map((s, i) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setState(s.statename);
                              setStateId(s.id);
                              setStateModalVisible(false);
                            }}
                            key={i}
                            style={styles.contentmainView}>
                            <Text style={styles.contentText}>
                              {s.statename}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </View>
                </Modal>
                <Pressable
                  onPress={toggleStateModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select State Type--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={state}
                    onChangeText={setState}
                    onPressIn={toggleStateModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.iconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>City</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setCityModalVisible(false)}
                  onBackButtonPress={() => setCityModalVisible(false)}
                  isVisible={isCityModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleCityModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Select City</Text>
                    </View>
                    <ScrollView>
                      {cityList?.map((c, i) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setCity(c.cityName);
                              setCityModalVisible(false);
                            }}
                            key={i}
                            style={styles.contentmainView}>
                            <Text style={styles.contentText}>{c.cityName}</Text>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </View>
                </Modal>
                <Pressable
                  onPress={toggleCityModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select City Type--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={city}
                    onChange={setCity}
                    onPressIn={toggleCityModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.iconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Address*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="Enter Address"
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={address}
                  onChangeText={setAddress}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>PIN/ZIP*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={pinCode}
                  onChangeText={setPinCode}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Website:</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={websiteInfo}
                  onChangeText={setWebsiteInfo}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>POC 1*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={poc}
                  onChangeText={setPoc}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Designation*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={designation}
                  onChangeText={setDesignation}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Title</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setTitleModalVisible(false)}
                  onBackButtonPress={() => setTitleModalVisible(false)}
                  isVisible={isTitleModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleTitleModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Select Title</Text>
                    </View>
                    {titleList.length ? (
                      <FlatList
                        data={titleList}
                        renderItem={({item}) => (
                          <Pressable
                            onPress={() => {
                              setTitle(item);
                              setTitleModalVisible(false);
                            }}
                            style={styles.contentmainView}>
                            <Text style={styles.contentText}>{item}</Text>
                          </Pressable>
                        )}
                      />
                    ) : null}
                  </View>
                </Modal>
                <Pressable
                  onPress={toggleTitleModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select Title--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={title}
                    onChangeText={setTitle}
                    onPressIn={toggleTitleModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.iconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Email ID POC 1*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Mobile POC 1*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="number-pad"
                  value={mobile}
                  onChangeText={setMobile}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Landline POC 1*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="number-pad"
                  value={landline}
                  onChangeText={setLandline}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Linkedin POC 1*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={linkedin}
                  onChangeText={setLinkedin}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Insta POC 1*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={instagram}
                  onChangeText={setInstagram}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Facebook POC 1*</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={facebook}
                  onChangeText={setFacebook}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Account Created By:</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  editable={false}
                  value={accountCrd}
                  onChangeText={setAccountCrd}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Account Assinged To</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setAccountAssignedModalVisible(false)}
                  onBackButtonPress={() =>
                    setAccountAssignedModalVisible(false)
                  }
                  isVisible={isAccountAssignedModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleAccountAssignedModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>
                        Select Account Assinged
                      </Text>
                    </View>
                    <ScrollView>
                      {accountList?.map((a, i) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setAccount(a.name);
                              setAccountAssignedModalVisible(false);
                            }}
                            key={i}
                            style={styles.contentmainView}>
                            <Text style={styles.contentText}>{a.name}</Text>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </View>
                </Modal>
                <Pressable
                  onPress={toggleAccountAssignedModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Account Assinged To--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={account}
                    onChangeText={setAccount}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.iconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.firstButtonView}>
              <TouchableOpacity style={styles.firstButton}>
                <Text style={styles.firstButtonText}>Add More POC +</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.secondButton}>
              <Text style={styles.secondButtonText}>Save Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddNewAccount;
