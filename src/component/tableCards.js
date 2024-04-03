import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

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
        <Text style={styles.action}>Convert to Lead</Text>
        <TouchableOpacity onPress={edit}>
          <Image
            source={require('../Assets/Images/pencil-square-icon.png')}
            style={styles.actionImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={call}>
          <Image
            source={require('../Assets/Images/call-icon.png')}
            style={styles.actionImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMail}>
          <Image
            source={require('../Assets/Images/red-mail-icon.png')}
            style={styles.actionImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={whatsApp}>
          <Image
            source={require('../Assets/Images/whatsapp-color-icon.png')}
            style={styles.actionImage}
          />
        </TouchableOpacity>
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
  },
  actionImage: {
    width: 18,
    height: 18,
  },
});

export default TableCard;
