import React from 'react'
import { View, Text,  TouchableOpacity, FlatList} from 'react-native';

import { styles } from "./styles/styles"

const CalendarScreen = ({ navigation }) => {
    const mockCalendarData = [
    { date: '2024-12-14', entries: [
        { device: 'Fitness Tracker', metric: 'Steps', value: 10000 },
        { device: 'Insulin Pump', metric: 'Glucose Level', value: 110 },
    ] },
    { date: '2024-12-13', entries: [
        { device: 'Pacemaker', metric: 'Heart Rate', value: 72 },
    ] },
    ];
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Calendar</Text>
      <FlatList
        data={mockCalendarData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.metric}>Date: {item.date}</Text>
            {item.entries.map((entry, index) => (
              <Text key={index} style={styles.metric}>{entry.device} - {entry.metric}: {entry.value}</Text>
            ))}
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Main</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CalendarScreen
