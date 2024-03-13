import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#054767',
  },
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 25,
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 2,
  },
  titleTxtStyle: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#012131',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    margin: 10,
  },
  nextMainView: {
    margin: 10,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
});
