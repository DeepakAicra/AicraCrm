import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    margin: 10,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
  },
  textInputContainer: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    width: '100%',
    color: 'grey',
    marginHorizontal: 5
  },
  selectedItemView: {
    marginVertical: 5,
  },
  titleTextBox: {
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 2,
  },
  multiLineView: {
    backgroundColor: '#fff',
    borderBottomColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#054767',
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#ecf4ff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
