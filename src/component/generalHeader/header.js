import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = ({
  title,
  backgroundColor,
  textColor,
  onPress,
  onPressNext,
  onPressLast,
  iconName,
  nextIconName,
  againIconName,
}) => {
  return (
    <View style={styles.headerView(backgroundColor)}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name={iconName}
          size={35}
          color="#fefefe"
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <View style={styles.titleView}>
        <Text style={styles.headerTxt(textColor)}>{title}</Text>
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <TouchableOpacity onPress={onPressNext}>
            <MaterialCommunityIcons
              name={nextIconName}
              size={25}
              color="#fefefe"
              style={styles.nextIconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressLast}>
            <FontAwesome name={againIconName} size={25} color="#fefefe" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
