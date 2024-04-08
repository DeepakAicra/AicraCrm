import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainView: {
    margin: 10,
  },
  selectedItemView: {
    // marginTop: 10,
  },
  multiLineView: {
    backgroundColor: '#fff',
    borderBottomColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
  },
  titleTextBox: {
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  textInputContainer: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  textInputStyle: {
    width: '100%',
    color: 'grey',
  },

  datePicker: {
    height: 120,
    marginTop: 80,
  },
  datePickerButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 40,
    // marginBottom: 15,
    backgroundColor: '#075985',
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  divideInputContainer: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  divideInputStyle: {
    color: 'grey',
    flex: 1,
  },
  dividePresableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conbineIconStyle: {
    marginRight: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    marginTop: 100,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 400,
    paddingBottom: 20,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView: {
    backgroundColor: '#054767',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  headerText: {
    color: '#fefefe',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    margin: 10,
  },
  contentmainView: {
    margin: 10,
    borderBlockColor: 'grey',
    borderBottomWidth: 0.25,
    marginHorizontal: 25,
  },
  contentText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    marginVertical: 7,
  },
  saveButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  saveFirstButton: {
    width: '45%',
    height: 40,
    backgroundColor: '#009efb',
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 3,
  },
  saveFirstButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveSecondButton: {
    width: '45%',
    height: 40,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 3,
  },
  saveSecondButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  combineButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 30,
    // backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  firstButton: {
    width: '45%',
    height: 40,
    backgroundColor: '#054767',
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 3,
  },
  firstButtonText: {
    fontSize: 18,
    color: '#ecf4ff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondButton: {
    width: '45%',
    height: 40,
    backgroundColor: '#ecf4ff',
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 3,
  },
  secondButtonText: {
    fontSize: 18,
    color: '#054767',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'blue',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
