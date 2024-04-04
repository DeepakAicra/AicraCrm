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
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute} from '@react-navigation/native';

const ConvertToLead = ({navigation}) => {
  const [isServiceModalVisible, setServiceModalVisible] = useState(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [isInvoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const [isTypeModalVisible, setTypeModalVisible] = useState(false);
  const [isAssignedModalVisible, setAssignedModalVisible] = useState(false);
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [service, setService] = useState('');
  const [serviceList, setServiceList] = useState([]);
  const [status, setStatus] = useState('');
  const [invoice, setInvoice] = useState('');
  const [discussType, setDiscussType] = useState('');
  const [assigned, setAssigned] = useState('');
  const [user, setUser] = useState('');
  const [value, onChangeText] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
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
      poc,
      designation,
      title,
      email,
      mobile,
      landline,
      linkedin,
      instagram,
      facebook,
      accountSbmt,
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

  const toggleServiceModal = () => {
    setServiceModalVisible(!isServiceModalVisible);
  };

  const toggleStatusModal = () => {
    setStatusModalVisible(!isStatusModalVisible);
  };

  const toggleInvoiceModal = () => {
    setInvoiceModalVisible(!isInvoiceModalVisible);
  };

  const toggleTypeModal = () => {
    setTypeModalVisible(!isTypeModalVisible);
  };

  const toggleAssignedModal = () => {
    setAssignedModalVisible(!isAssignedModalVisible);
  };

  const toggleUserModal = () => {
    setUserModalVisible(!isUserModalVisible);
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
                    {/* {serviceList.length ? (
                <FlatList
                  data={serviceList}
                  renderItem={({item}) => (
                    <Pressable
                      onPress={() => {
                        setService(item);
                        setServiceModalVisible(false);
                      }}
                      style={styles.contentmainView}>
                      <Text style={styles.contentText}>{item}</Text>
                    </Pressable>
                  )}
                />
              ) : null} */}
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
                    style={styles.iconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Service Packages:</Text>
              <View style={styles.multiLineView}>
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={10}
                  onChangeText={text => onChangeText(text)}
                  value={value}
                  style={{padding: 10}}
                />
              </View>
            </View>
            <View style={styles.selectedItemView}>
              <Text style={styles.titleTextBox}>Discuss Amount, if any</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType="default"
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
                    style={styles.iconStyle}
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
                    style={styles.iconStyle}
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
                      placeholder="--Select DOB--"
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
                    style={styles.iconStyle}
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
                    style={styles.iconStyle}
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
                    style={styles.iconStyle}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.saveButtonView}>
              <TouchableOpacity style={styles.saveFirstButton}>
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
