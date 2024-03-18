import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    margin: 10,
  },
  selectedItemView: {
    // marginTop: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  textInputStyle: {
    width: '100%',
    color: 'grey',
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
  iconStyle: {
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
  firstButtonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  firstButton: {
    width: '45%',
    height: 40,
    backgroundColor: '#ecf4ff',
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 3,
  },
  firstButtonText: {
    fontSize: 18,
    color: '#054767',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#054767',
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 3,
  },
  secondButtonText: {
    fontSize: 18,
    color: '#ecf4ff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
