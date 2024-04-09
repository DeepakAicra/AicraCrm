import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AttendanceCard = ({
  date,
  name,
  clock_in,
  clock_out,
  working_hours,
  remarks,
}) => {
  const firstCharacter = name.charAt(0);
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{firstCharacter}</Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.date}>Date: {date}</Text>
          <Text style={styles.name}>Name: {name}</Text>
          <Text style={styles.clock_in}>{`Clock In: ${clock_in}`}</Text>
          <Text style={styles.clock_out}>{`Clock Out: ${clock_out}`}</Text>
          {/* <Text style={styles.working_hours}>
            Working Hours: {working_hours}
          </Text> */}
          <Text style={styles.remarks}>
            Remarks: {remarks}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
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
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  clock_in: {
    fontSize: 16,
    fontWeight: '500',
  },
  clock_out: {
    fontSize: 16,
    fontWeight: '500',
  },
  working_hours: {
    fontSize: 16,
    fontWeight: '500',
  },
  remarks: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AttendanceCard;
