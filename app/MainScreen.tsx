import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles/styles';

const MainScreen = ({ navigation, route }) => {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const { name } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello, {name}</Text>

      <Text style={styles.subHeader}>Connected Devices</Text>
      {connectedDevices.length > 0 ? (
        <FlatList
          data={connectedDevices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.metric}>Device: {item.type}</Text>
              <Text style={styles.metric}>Manufacturer: {item.manufacturer}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No devices connected.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddDevice',{connectedDevices,setConnectedDevices})}>
        <Text style={styles.buttonText}>Add Device</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManualEntry')}
      >
        <Text style={styles.buttonText}>Enter Data Manually</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Calendar')}
      >
        <Text style={styles.buttonText}>View Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GoogleFit')}
      >
        <Text style={styles.buttonText}>Google Fit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;
