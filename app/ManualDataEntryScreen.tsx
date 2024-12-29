import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from './styles/styles';

const ManualDataEntryScreen = ({ navigation }) => {
  const [pulse, setPulse] = useState('');
  const [spo2, setSpo2] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate || new Date(),
      mode: 'date',
      is24Hour: true,
      onChange: (event, date) => {
        if (date) setSelectedDate(date);
      },
    });
  };

  const handleTimePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedTime || new Date(),
      mode: 'time',
      is24Hour: true,
      onChange: (event, time) => {
        if (time) {
          const formattedTime = new Date(time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
          setSelectedTime(formattedTime);
        }
      },
    });
  };

  const handleSubmit = async () => {
    if (!pulse || !spo2 || !systolic || !diastolic || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please fill in all fields and select date/time.');
      return;
    }

    const payload = {
      userId: 2, // Replace with logged-in user's ID (fetch from storage or context)
      pulse: parseInt(pulse, 10),
      spo2: parseInt(spo2, 10),
      systolic: parseInt(systolic, 10),
      diastolic: parseInt(diastolic, 10),
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
    };

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('auth_token');
      const response = await axios.post(
        'https://330d-78-154-129-218.ngrok-free.app/api/health/addHealthMetrics',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      Alert.alert('Success', 'Health metrics submitted successfully!');
      setPulse('');
      setSpo2('');
      setSystolic('');
      setDiastolic('');
      setSelectedDate(new Date());
      setSelectedTime('');
    } catch (error) {
      console.error('Error submitting health metrics:', error);
      Alert.alert('Error', 'Failed to submit health metrics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manual Data Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Pulse (bpm)"
        keyboardType="numeric"
        value={pulse}
        onChangeText={setPulse}
      />
      <TextInput
        style={styles.input}
        placeholder="SpO2 (%)"
        keyboardType="numeric"
        value={spo2}
        onChangeText={setSpo2}
      />
      <TextInput
        style={styles.input}
        placeholder="Systolic Pressure (mmHg)"
        keyboardType="numeric"
        value={systolic}
        onChangeText={setSystolic}
      />
      <TextInput
        style={styles.input}
        placeholder="Diastolic Pressure (mmHg)"
        keyboardType="numeric"
        value={diastolic}
        onChangeText={setDiastolic}
      />
      <TouchableOpacity style={styles.datePickerButton} onPress={handleDatePicker}>
        <Text style={styles.datePickerText}>Date: {selectedDate.toDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.datePickerButton} onPress={handleTimePicker}>
        <Text style={styles.datePickerText}>Time: {selectedTime || 'Select Time'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#aaa' }]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManualDataEntryScreen;
