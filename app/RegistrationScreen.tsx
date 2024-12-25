import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert,Button } from 'react-native';
import { styles } from './styles/styles';
import axios from 'axios'

const RegistrationScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
        const response = await axios.post('https://08ac-78-154-129-218.ngrok-free.app/api/auth/register', {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            client_type: 'patient', 
        });
        console.log('Registration successful:', response.data);
        navigation.navigate('PatientDashboard');
    } catch (err: any) {
        setError(err.response?.data?.message || 'Registration failed');
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
      />
      <View style={{gap:10}}>
            <Button title="Register" onPress={handleRegister} />
            <Button

                title="Already registered"
                onPress={() => navigation.navigate('Login')}
            />
      </View>

    </View>
  );
};

export default RegistrationScreen;
