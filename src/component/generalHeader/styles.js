import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  headerView: backgroundColor => ({
    backgroundColor: backgroundColor,
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
  }),
  iconStyle: {
    marginLeft: 5,
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15,
  },
  headerTxt: textColor => ({
    color: textColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 3,
  }),
  nextIconStyle: {
    marginHorizontal: 30,
  },
});
