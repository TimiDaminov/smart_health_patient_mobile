import React from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, Modal } from 'react-native';
import { styles } from "./styles/styles"
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const AddDeviceScreen = ({ navigation,route }) => {
    const {setConnectedDevices,connectedDevices} = route.params
    const deviceTypes = [
  { id: '1', type: 'Fitness Tracker', manufacturers: ['Fitbit', 'Garmin', 'Huawei'], metrics: ['Steps', 'Heart Rate', 'Calories Burned'], maxSubmissions: 1 },
  { id: '2', type: 'Insulin Pump', manufacturers: ['Medtronic', 'Omnipod'], metrics: ['Insulin Level', 'Glucose Level'], maxSubmissions: 3 },
  { id: '3', type: 'Pacemaker', manufacturers: ['Boston Scientific', 'Medtronic'], metrics: ['Heart Rate', 'Battery Status'], maxSubmissions: 2 },
    ];

    const [selectedManufacturer, setSelectedManufacturer] = useState('');
    const [selectedDevice, setSelectedDevice] = useState('');

const addDevice = () => {
    if (selectedDevice && selectedManufacturer) {
      const newDevice = {
        id: `${Date.now()}`, 
        type: selectedDevice,
        manufacturer: selectedManufacturer,
      };
      setConnectedDevices([...connectedDevices, newDevice]);
      setSelectedDevice('');
      setSelectedManufacturer('');
    } else {
      Alert.alert('Error', 'Please select both device type and manufacturer.');
    }
    };
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a Device</Text>
      <Picker
        selectedValue={selectedDevice}
        onValueChange={(value) => setSelectedDevice(value)}
        style={styles.input}
      >
        <Picker.Item label="Select Device Type" value="" />
        {deviceTypes.map((device) => (
          <Picker.Item key={device.id} label={device.type} value={device.type} />
        ))}
      </Picker>

      {selectedDevice && (
        <Picker
          selectedValue={selectedManufacturer}
          onValueChange={setSelectedManufacturer}
          style={styles.input}
        >
          <Picker.Item label="Select Manufacturer" value="" />
          {deviceTypes
            .find((device) => device.type === selectedDevice)
            ?.manufacturers.map((manufacturer, index) => (
              <Picker.Item key={index} label={manufacturer} value={manufacturer} />
            ))}
        </Picker>
      )}

      <TouchableOpacity style={styles.button} onPress={addDevice}>
        <Text style={styles.buttonText}>Confirm Device</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#aaa' }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Main</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddDeviceScreen
