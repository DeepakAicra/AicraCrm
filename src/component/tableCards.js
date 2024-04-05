import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TableCard = ({title, mobile, email, edit, call, sendMail, whatsApp}) => {
  const firstCharacter = title.charAt(0);

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{firstCharacter}</Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.contact}>Mob: +91- {mobile}</Text>
          <Text style={styles.contact}>E-mail: {email}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={edit}>
            <MaterialIcons
              name="edit-square"
              size={18}
              color="black"
              style={styles.actionImage}
            />
          </TouchableOpacity>
          <Text style={styles.action}>Edit</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={call}>
            <MaterialIcons
              name="call"
              size={18}
              color="#33a867"
              style={styles.actionImage}
            />
          </TouchableOpacity>
          <Text style={styles.action}>Call</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={sendMail}>
            <MaterialIcons
              name="email"
              size={18}
              color="#f2555f"
              style={styles.actionImage}
            />
          </TouchableOpacity>
          <Text style={styles.action}>Email</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={whatsApp}>
            <FontAwesome
              name="whatsapp"
              size={18}
              color="#25d366"
              style={styles.actionImage}
            />
          </TouchableOpacity>
          <Text style={styles.action}>What's App</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
  },
  leftContent: {
    justifyContent: 'center',
    marginRight: 10,
  },
  titleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 88, 14, 1)',
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  contact: {
    fontSize: 14,
    color: '#888',
    fontWeight: '400',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  action: {
    color: '#007bff',
    fontSize: 14,
    marginHorizontal: 4,
  },
  actionImage: {
    width: 18,
    height: 18,
  },
});

export default TableCard;
