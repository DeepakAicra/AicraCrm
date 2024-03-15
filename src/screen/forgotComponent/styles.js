import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainView: {
    margin: 10,
  },
  txtStyle: {
    color: 'black',
    marginVertical: 5,
  },
  passwordView: {
    marginBottom: 5,
  },
  passwordViewStyle: {
    flexDirection: 'row',
  },
  passwordTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  starTxtStyle: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    color: 'red',
  },
  textInputContainer: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  textInputStyle: {
    width: '100%',
  },
  button: {
    backgroundColor: '#054767',
    width: '100%',
    height: 45,
    // borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 35,
    elevation: 5,
  },
  buttonText: {
    color: '#ecf4ff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
