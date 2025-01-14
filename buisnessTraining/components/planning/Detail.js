import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Detail = ({ route, navigation }) => {
  const { event } = route.params; 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.category}>{event.category}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailHeader}>Event Details</Text>
        <Text style={styles.info}>Date: {event.start.toLocaleDateString()}</Text>
        <Text style={styles.info}>Start Time: {event.start.toLocaleTimeString()}</Text>
        <Text style={styles.info}>End Time: {event.end.toLocaleTimeString()}</Text>

        <View style={styles.sessionDetails}>
          <Text style={styles.sessionTitle}>Session Details:</Text>
          <Text style={styles.sessionInfo}>Topic: {event.sessionDetails.topic}</Text>
          <Text style={styles.sessionInfo}>Time: {event.sessionDetails.start} - {event.sessionDetails.end}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 25,
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    width: '100%',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  info: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  sessionDetails: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
  sessionInfo: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Detail;
