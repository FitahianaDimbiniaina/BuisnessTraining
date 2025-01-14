import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import planningData from './InfoPlanning.json';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const transformDataToEvents = (planningData) => {
  let events = [];

  Object.keys(planningData).forEach((category) => {
    const categoryData = planningData[category];
    if (categoryData.schedule && Array.isArray(categoryData.schedule)) {
      categoryData.schedule.forEach((day) => {
        if (day.sessions && Array.isArray(day.sessions)) {
          day.sessions.forEach((session) => {
            events.push({
              title: `${session.topic} (${category})`,
              start: new Date(`${day.date}T${session.start}`),
              end: new Date(`${day.date}T${session.end}`),
              category: category,
              sessionDetails: session,
            });
          });
        }
      });
    }
  });

  return events;
};

const GeneralPlanning = () => {
  const [viewMode, setViewMode] = useState('week');
  const [currentMonth, setCurrentMonth] = useState('');

  const [events] = useState(transformDataToEvents(planningData.planning));
  const navigation = useNavigation();

  const handleEventPress = (event) => {
    navigation.navigate('Detail', { event });
  };

  const handleViewChange = (newView) => {
    setViewMode(newView);
  };

  const handleRangeChange = (range) => {
    if (range && range.length > 0) {
      const firstVisibleDate = moment(range[0]);
      setCurrentMonth(firstVisibleDate.format('MMMM YYYY'));
      console.log(currentMonth)
    }
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item)} style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventTime}>
        {moment(item.start).format('MMMM Do YYYY, h:mm a')} - {moment(item.end).format('h:mm a')}
      </Text>
    </TouchableOpacity>
  );
  const eventStyleGetter = (event) => {
    let backgroundColor = '#3b7dda';
    if (event.category === 'GESTION') {
      backgroundColor = '#ff6347'; 
    }

    return {
      style: {
        backgroundColor,
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
      },
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentMonth}</Text>

      <View style={styles.viewButtonContainer}>
        <TouchableOpacity onPress={() => handleViewChange('day')} style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleViewChange('week')} style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleViewChange('month')} style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleViewChange('schedule')} style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Schedule</Text>
        </TouchableOpacity>
      </View>
      {viewMode === 'schedule' ? (
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.scheduleList}
        />
      ) : (
        <Calendar
          events={events}
          firstDay={1}
          height={600}
          mode={viewMode}
          scrollEnabled={true}
          onPressEvent={handleEventPress}
          onChangeRange={handleRangeChange}
          eventStyleGetter={eventStyleGetter} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: '#f5f5f5',
    top: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  viewButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  viewButton: {
    padding: 10,
    backgroundColor: '#3b7dda',
    borderRadius: 5,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 16,
  },
  scheduleList: {
    marginTop: 10,
    backgroundColor:'transparent'
  },
  eventItem: {
    padding: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'grey',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    color: 'gray',
    fontSize: 14,
  },
});

export default GeneralPlanning;
