import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainView: {
    margin: 10,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
  },
  selectedItemView: {
    marginVertical: 5,
  },
  textInputContainer: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    width: '100%',
    color: 'black',
    marginHorizontal: 10,
  },
  titleTextBox: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 5,
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
});
