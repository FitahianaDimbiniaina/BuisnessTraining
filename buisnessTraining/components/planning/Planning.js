import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import planningData from './InfoPlanning.json';
import { useRoute } from '@react-navigation/native';

const Planning = () => {
  const route = useRoute();
  const { subcategory } = route.params;

  const [nearestDate, setNearestDate] = useState(null);

  useEffect(() => {
    // Find the nearest date for the current subcategory
    const schedule = planningData.planning[subcategory.name].schedule;
    const allDates = [];

    // Loop through all the days in the schedule to find all possible dates
    schedule.forEach((daySchedule) => {
      let dayDate;
      if (daySchedule.date) {
        dayDate = moment(daySchedule.date, 'YYYY-MM-DD');
      } else if (daySchedule.day) {
        dayDate = moment().startOf('week').clone().day(daySchedule.day); // calculate day of the week
      }

      if (dayDate.isAfter(moment(), 'day')) {
        allDates.push(dayDate);
      }
    });

    // Find the nearest upcoming date
    if (allDates.length > 0) {
      const nearest = moment.min(allDates);
      setNearestDate(nearest);
    }
  }, [subcategory]);

  // Function to handle the navigation of weeks
  const handleWeekChange = (direction) => {
    if (!nearestDate) return; // Don't change if no date is selected yet
    const newWeek = nearestDate.clone().add(direction, 'weeks');
    setNearestDate(newWeek);
  };

  const renderScheduleForDay = () => {
    if (!nearestDate) return <Text>Loading...</Text>;

    const schedule = planningData.planning[subcategory.name].schedule;
    const daySchedule = schedule.find((day) => {
      let dayDate;
      if (day.date) {
        dayDate = moment(day.date, 'YYYY-MM-DD');
      } else if (day.day) {
        dayDate = moment().startOf('week').clone().day(day.day);
      }
      return dayDate.isSame(nearestDate, 'day');
    });

    if (daySchedule) {
      return (
        <View style={styles.dayContainer}>
          <Text style={styles.scheduleDay}>{nearestDate.format('dddd, MMM D')}</Text>
          {daySchedule.sessions.map((session, idx) => (
            <View key={idx} style={styles.sessionContainer}>
              <Text style={styles.sessionTime}>{session.start} - {session.end}</Text>
              <Text style={styles.sessionTopic}>{session.topic}</Text>
            </View>
          ))}
        </View>
      );
    }
    return <Text>No sessions for this day.</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subcategory.name}</Text>

      {/* Week Navigation */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => handleWeekChange(-1)} style={styles.navButton}>
          <Text style={styles.navButtonText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.weekText}>
          {nearestDate ? nearestDate.format('MMM D, YYYY') : 'Loading...'}
        </Text>
        <TouchableOpacity onPress={() => handleWeekChange(1)} style={styles.navButton}>
          <Text style={styles.navButtonText}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Render Schedule for the Nearest Date */}
      <ScrollView style={styles.scheduleContainer}>
        {renderScheduleForDay()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 15,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#1a73e8', // Google Calendar blue color
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  navButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 20,
    color: '#1a73e8', // Blue arrows for next/previous week
  },
  weekText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  scheduleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dayContainer: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  scheduleDay: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1a73e8',
    marginBottom: 10,
  },
  sessionContainer: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  sessionTime: {
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 5,
  },
  sessionTopic: {
    fontSize: 16,
    color: '#202124',
  },
});

export default Planning;
