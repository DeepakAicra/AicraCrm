import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';
import {Dropdown} from 'react-native-element-dropdown';

const ConvertToLead = ({navigation}) => {
  const [isServiceModalVisible, setServiceModalVisible] = useState(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [isInvoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const [isTypeModalVisible, setTypeModalVisible] = useState(false);
  const [isAssignedModalVisible, setAssignedModalVisible] = useState(false);
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [empId, setEmpId] = useState('');
  const [service, setService] = useState('');
  const [serviceList, setServiceList] = useState([]);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [offerDiscount, setOfferDiscount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [status, setStatus] = useState('');
  const [statusList, setStatusList] = useState([]);
  const [invoice, setInvoice] = useState('');
  const [rcaInvoiceList, setRcaInvoiceList] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [discussType, setDiscussType] = useState('');
  const [discussTypeList, setDiscussTypeList] = useState([]);
  const [assigned, setAssigned] = useState('');
  const [assignedList, setAssignedList] = useState([]);
  const [user, setUser] = useState('');
  const [userList, setUserList] = useState([]);
  const userType = 'Sales';

  const {
    params: {
      name,
      accountType,
      industryType,
      services,
      gstNo,
      account,
      address,
      countryId,
      stateId,
      cityId,
      pinCode,
      websiteInfo,
      poc,
      designation,
      title,
      email,
      mobile,
      landline,
      linkedin,
      instagram,
      facebook,
      addPoc,
      addDesignation,
      addTitle,
      addEmail,
      addMobile,
      addLandline,
      addlinkedin,
      addInstagram,
      addFacebook,
    },
  } = useRoute();

  const onSubmit = () => {
    let formData = new FormData();
    formData.append('emp_id', empId);
    formData.append('Account_Name', name);
    formData.append('Account_Type', accountType);
    formData.append('Industry', industryType);
    formData.append('companyservices', services);
    formData.append('gstno', gstNo);
    formData.append('account_created_by', account);
    formData.append('txtaddress', address);
    formData.append('country', countryId);
    formData.append('state', stateId);
    formData.append('city', cityId);
    formData.append('pin', pinCode);
    formData.append('website', websiteInfo);
    formData.append('poc', poc);
    formData.append('desigination', designation);
    formData.append('title', title);
    formData.append('txtemail', email);
    formData.append('txtmobileno', mobile);
    formData.append('landlineno', landline);
    formData.append('Linkedin', linkedin);
    formData.append('insta', instagram);
    formData.append('facebook', facebook);
    formData.append('addpoc', addPoc);
    formData.append('adddesigination', addDesignation);
    formData.append('addtitle', addTitle);
    formData.append('addemail', addEmail);
    formData.append('addmobileno', addMobile);
    formData.append('addlandlineno', addLandline);
    formData.append('addLinkedin', addlinkedin);
    formData.append('addinsta', addInstagram);
    formData.append('addfacebook', addFacebook);
    formData.append('Interest', service);
    formData.append('service_packages', value);
    formData.append('discount_offered', offerDiscount);
    formData.append('Remarks', remarks);
    formData.append('Status', status);
    formData.append('rca', invoice);
    formData.append('FollowupDate', dateOfBirth);
    formData.append('FollowupTime', time);
    formData.append('txttypeoflead', discussType);
    formData.append('txtleadassign', assigned);
    formData.append('txtusers', user);

    axios({
      url: API_URL + 'Add_New_Lead',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.status) {
          // console.log(response.data.status);
          Alert.alert('Details saved successfully', '', [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]);
        } else {
          Alert.alert('Failed to update details');
        }
      })
      .catch(error => {
        console.error('Error while updating details:', error);
        Alert.alert('Failed to update details');
      });
  };

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        return value;
      } else {
        throw new Error('User ID not found in AsyncStorage');
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserData();
      if (userId) {
        setEmpId(userId);
      }
    };
    fetchData();
  }, []);

  const toggleServiceModal = () => {
    if (!isServiceModalVisible) {
      axios({
        url: `${API_URL}Select_Services?empid=${empId}`,
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data && response.data.status === true) {
            setServiceList(response.data.service_data);
            setServiceModalVisible(!isServiceModalVisible);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
  };

  useEffect(() => {
    axios({
      url: `${API_URL}Select_Service_Packages_Lead?service_packages=${service}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data && response.data.status === true) {
          setOptions(response.data.service_packages_data);
        } else {
          Alert.alert('Invalid Details !');
        }
      })
      .catch(error => console.log(error));
  }, [service]);

  const toggleStatusModal = () => {
    if (!isStatusModalVisible) {
      axios({
        url: API_URL + 'Lead_Status',
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data && response.data.status === true) {
            setStatusList(response.data.data);
            setStatusModalVisible(!isStatusModalVisible);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
  };

  const toggleInvoiceModal = () => {
    if (!isInvoiceModalVisible) {
      axios({
        url: API_URL + 'RCA_Invoice_Type',
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data && response.data.status === true) {
            setRcaInvoiceList(Object.keys(response.data.Title_Data));
            setInvoiceModalVisible(!isInvoiceModalVisible);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
  };

  const toggleTypeModal = () => {
    if (!isTypeModalVisible) {
      axios({
        url: API_URL + 'Lead_Discussion_Type',
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data && response.data.status === true) {
            setDiscussTypeList(response.data.Lead_Discussion_Type);
            setTypeModalVisible(!isTypeModalVisible);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
  };

  const toggleAssignedModal = () => {
    if (!isAssignedModalVisible) {
      axios({
        url: `${API_URL}Lead_Assigned?empid=${empId}`,
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (response.data && response.data.status === true) {
            setAssignedList(Object.keys(response.data.Title_Data));
            setAssignedModalVisible(!isAssignedModalVisible);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
  };

  const toggleUserModal = () => {
    if (!isUserModalVisible) {
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
            setUserList(response.data.users);
            setUserModalVisible(!isUserModalVisible);
          } else {
            Alert.alert('Invalid Details !');
          }
        })
        .catch(error => console.log(error));
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({type}, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatePicker();
        setDateOfBirth(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(formatDate(date));
    toggleDatePicker();
  };

  const formatDate = rawDate => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <Header
          backgroundColor={'#054767'}
          iconName={'chevron-left'}
          title={'Convert To Lead'}
          textColor={'#ffffff'}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Select Service</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setServiceModalVisible(false)}
                  onBackButtonPress={() => setServiceModalVisible(false)}
                  isVisible={isServiceModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleServiceModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Select Service</Text>
                    </View>
                    <ScrollView>
                      {serviceList?.map((a, i) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setService(a.services_interested);
                              setServiceModalVisible(false);
                            }}
                            key={i}
                            style={styles.contentmainView}>
                            <Text style={styles.contentText}>
                              {a.services_interested}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </View>
                </Modal>
                <Pressable
                  onPress={toggleServiceModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select Service--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={service}
                    onChangeText={setService}
                    onPressIn={toggleServiceModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.conbineIconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Service Packages:</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={options}
                search
                maxHeight={300}
                labelField="service_packages"
                valueField="id"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? 'blue' : 'black'}
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Discuss Amount, if any</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={offerDiscount}
                  onChangeText={setOfferDiscount}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Remarks</Text>
              <View style={styles.multiLineView}>
                <TextInput
                  editable
                  multiline
                  numberOfLines={2}
                  maxLength={2}
                  value={remarks}
                  onChangeText={setRemarks}
                  style={{padding: 10}}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Status</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setStatusModalVisible(false)}
                  onBackButtonPress={() => setStatusModalVisible(false)}
                  isVisible={isStatusModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleStatusModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Status</Text>
                    </View>
                    {statusList.length ? (
                      <FlatList
                        data={statusList}
                        renderItem={({item}) => (
                          <Pressable
                            onPress={() => {
                              setStatus(item);
                              setStatusModalVisible(false);
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
                  onPress={toggleStatusModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select Status--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={status}
                    onChangeText={setStatus}
                    onPressIn={toggleStatusModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.conbineIconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>RCA Invoice</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setInvoiceModalVisible(false)}
                  onBackButtonPress={() => setInvoiceModalVisible(false)}
                  isVisible={isInvoiceModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleInvoiceModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Invoice</Text>
                    </View>
                    {rcaInvoiceList.length ? (
                      <FlatList
                        data={rcaInvoiceList}
                        renderItem={({item}) => (
                          <Pressable
                            onPress={() => {
                              setInvoice(item);
                              setInvoiceModalVisible(false);
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
                  onPress={toggleInvoiceModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select Invoice--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={invoice}
                    onChangeText={setInvoice}
                    onPressIn={toggleInvoiceModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.conbineIconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Follow up Date</Text>
              <View style={styles.textInputContainer}>
                {showPicker && (
                  <DateTimePicker
                    mode="date"
                    is24Hour={false}
                    display="spinner"
                    value={date}
                    onChange={onChange}
                    positiveButton={{label: 'OK', textColor: 'green'}}
                    negativeButton={{label: 'Cancel', textColor: 'red'}}
                  />
                )}
                {showPicker && Platform.OS === 'ios' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      style={[
                        styles.datePickerButton,
                        styles.pickerButton,
                        {backgroundColor: '#11182711'},
                      ]}
                      onPress={toggleDatePicker}>
                      <Text style={[styles.buttonText, {color: '#075985'}]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.datePickerButton, styles.pickerButton]}
                      onPress={confirmIOSDate}>
                      <Text style={[styles.buttonText]}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {!showPicker && (
                  <Pressable onPress={confirmIOSDate}>
                    <TextInput
                      placeholder="--Select Date--"
                      placeholderTextColor={'grey'}
                      keyboardType="default"
                      editable={false}
                      value={dateOfBirth}
                      onChange={setDateOfBirth}
                      onPressIn={toggleDatePicker}
                      style={styles.textInputStyle}
                    />
                  </Pressable>
                )}
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Time</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="HH : MM"
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  value={time}
                  onChangeText={setTime}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Discussion Type</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setTypeModalVisible(false)}
                  onBackButtonPress={() => setTypeModalVisible(false)}
                  isVisible={isTypeModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleTypeModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Discussion Type</Text>
                    </View>
                    {discussTypeList.length ? (
                      <FlatList
                        data={discussTypeList}
                        renderItem={({item}) => (
                          <Pressable
                            onPress={() => {
                              setDiscussType(item);
                              setTypeModalVisible(false);
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
                  onPress={toggleTypeModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select Discussion Type--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={discussType}
                    onChangeText={setDiscussType}
                    onPressIn={toggleTypeModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.conbineIconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Lead Assigned</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setAssignedModalVisible(false)}
                  onBackButtonPress={() => setAssignedModalVisible(false)}
                  isVisible={isAssignedModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleAssignedModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>Lead Assigned</Text>
                    </View>
                    {assignedList.length ? (
                      <FlatList
                        data={assignedList}
                        renderItem={({item}) => (
                          <Pressable
                            onPress={() => {
                              setAssigned(item);
                              setAssignedModalVisible(false);
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
                  onPress={toggleAssignedModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select Assigned--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={assigned}
                    onChangeText={setAssigned}
                    onPressIn={toggleAssignedModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.conbineIconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Select User</Text>
              <View style={styles.divideInputContainer}>
                <Modal
                  onBackdropPress={() => setUserModalVisible(false)}
                  onBackButtonPress={() => setUserModalVisible(false)}
                  isVisible={isUserModalVisible}
                  swipeDirection="down"
                  onSwipeComplete={toggleUserModal}
                  animationIn="bounceInUp"
                  animationOut="bounceOutDown"
                  animationInTiming={900}
                  animationOutTiming={500}
                  backdropTransitionInTiming={1000}
                  backdropTransitionOutTiming={500}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <View style={styles.headerView}>
                      <Text style={styles.headerText}>User</Text>
                    </View>
                    <ScrollView>
                      {userList?.map((a, i) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setUser(a.name);
                              setUserModalVisible(false);
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
                  onPress={toggleUserModal}
                  style={styles.dividePresableStyle}>
                  <TextInput
                    placeholder="--Please Select User--"
                    placeholderTextColor={'grey'}
                    keyboardType="default"
                    editable={false}
                    value={user}
                    onChangeText={setUser}
                    onPressIn={toggleUserModal}
                    style={styles.divideInputStyle}
                  />
                  <AntDesign
                    name={'down'}
                    size={20}
                    color={'black'}
                    style={styles.conbineIconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.saveButtonView}>
              <TouchableOpacity
                onPress={onSubmit}
                style={styles.saveFirstButton}>
                <Text style={styles.saveFirstButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveSecondButton}>
                <Text style={styles.saveSecondButtonText}>
                  Save & Generate PI
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.combineButtonView}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.firstButton}>
                <Text style={styles.firstButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.secondButton}>
                <Text style={styles.secondButtonText}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ConvertToLead;
