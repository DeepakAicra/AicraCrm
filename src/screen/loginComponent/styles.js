import {StyleSheet} from 'react-native';
import Colors from '../../Assets/Theme/Theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#054767',
  },
  mainView: {
    margin: 15,
  },
  logoStyle: {
    width: 187,
    height: 88,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 30,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    height: 48,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textInputStyle: {
    width: '95%',
    color: 'white',
  },
  textFailed: {
    color: Colors.rose,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  passwordInputStyle: {
    height: 48,
    width: '85%',
    marginLeft: 10,
    color: 'white',
  },
  wrapperIcon: {
    flex: 1,
  },
  forgotView: {
    flexDirection: 'row-reverse',
  },
  forgotTxtStyle: {
    color: Colors.white,
  },
  bottomViewStyle: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  bottomTxtStyle: {
    color: Colors.white,
  },
  registerTxtStyle: {
    color: '#00bfff',
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#06b6df',
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#ecf4ff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleButton: {
    width: '100%',
    height: 45,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
});
