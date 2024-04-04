import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#054767',
  },
  mainView: {
    margin: 10,
    backgroundColor: '#012131',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  txtStyle: {
    color: '#fff',
    fontSize: 19,
    textDecorationLine: 'underline',
  },
  addButtonStyle: {
    backgroundColor: '#054767',
    padding: 10,
    borderRadius: 20,
  },
  addTxtStyle: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
  },
  entryTxt: {
    color: '#fff',
    fontSize: 19,
    textDecorationLine: 'underline',
    margin: 10,
  },
  tableHeader: {
    backgroundColor: 'grey',
  },
  titleView: {
    padding: 10,
  },
  CountactList: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  seeMoreTouch: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: 10,
  },
  seeMoreTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#06b6df',
  },
});
