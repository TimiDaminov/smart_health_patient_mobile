import React from 'react'
import { View, Text,TextInput,TouchableOpacity,Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from "./styles/styles"
import { useState } from 'react';

const ManualDataEntryScreen = ({navigator}) => {
    const [selectedManufacturer, setSelectedManufacturer] = useState('');
    const [selectedDevice, setSelectedDevice] = useState('');
    const [manualMetrics, setManualMetrics] = useState([]);
    const [metricValues, setMetricValues] = useState({});

    
    const handleManualSubmit = async () => {
      if (Object.values(metricValues).some((value) => value === '')) {
        Alert.alert('Error', 'Please fill in all selected metrics.');
        return;
      }
    
      const payload = {
        deviceType: selectedDevice,
        manufacturer: selectedManufacturer,
        metrics: metricValues,
        timestamp: new Date().toISOString(),
      };
    
      try {
        const response = await fetch('https://330d-78-154-129-218.ngrok-free.app/api/submit-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
    
        Alert.alert('Success', 'Data submitted successfully!');
        setMetricValues({});
        setSelectedDevice('');
        setSelectedManufacturer('');
        setManualMetrics([]);
      } catch (error) {
        Alert.alert('Error', 'Failed to submit data. Please try again.');
        console.error(error);
      }
    };
    

    const deviceTypes = [
        { id: '1', type: 'Fitness Tracker', manufacturers: ['Fitbit', 'Garmin', 'Huawei'], metrics: ['Steps', 'Heart Rate', 'Calories Burned'], maxSubmissions: 1 },
        { id: '2', type: 'Insulin Pump', manufacturers: ['Medtronic', 'Omnipod'], metrics: ['Insulin Level', 'Glucose Level'], maxSubmissions: 3 },
        { id: '3', type: 'Pacemaker', manufacturers: ['Boston Scientific', 'Medtronic'], metrics: ['Heart Rate', 'Battery Status'], maxSubmissions: 2 },
    ];
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manual Data Entry</Text>
      <Picker
        selectedValue={selectedDevice}
        onValueChange={(value) => {
          setSelectedDevice(value);
          setManualMetrics(deviceTypes.find((device) => device.type === value)?.metrics || []);
          setSelectedManufacturer('');
        }}
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
          {manualMetrics.length > 0 && (
              <View>
                  <Text style={styles.subHeader}>Enter Metrics</Text>
                  {manualMetrics.map((metric, index) => (
                      <View key={index} style={{ marginBottom: 15 }}>
                          <Text>{metric}</Text>
                          <TextInput
                              style={styles.metricInput}
                              placeholder={`Enter ${metric}`}
                              keyboardType="numeric"
                              onChangeText={(value) => setMetricValues({ ...metricValues, [metric]: value })}
                          />
                      </View>
                  ))}
              </View>
            
          )}
    <TouchableOpacity style={styles.button} onPress={handleManualSubmit}>
        <Text style={styles.buttonText}>Submit Data</Text>
      </TouchableOpacity>
    <TouchableOpacity style={[styles.button, { backgroundColor: '#aaa' }]} onPress={() => navigator.goBack()} >
       <Text style={styles.buttonText}>Back to Main</Text>
      </TouchableOpacity>
    </View>            
)}

export default ManualDataEntryScreen
