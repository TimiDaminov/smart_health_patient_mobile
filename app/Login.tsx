import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { HelloWave } from '@/components/HelloWave';
import { ExternalLink } from '@/components/ExternalLink';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { jwtDecode } from "jwt-decode";
const LoginScreen = ({ navigation }: { navigation: any }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
      try {
        console.log("Attempting login with", { email, password });

        const response = await axios.post('https://330d-78-154-129-218.ngrok-free.app/api/auth/login', {
          email,
          password,
        });
    

        console.log('Login response:', response.data);
    
        const { token, userId, role, first_name } = response.data;

    

        await AsyncStorage.setItem('auth_token', token);
        console.log('Token saved in AsyncStorage');

        if (role === 2) {

          console.log('Navigating to DoctorDashboard');
          console.log('Stored token:', token);
          navigation.navigate('DoctorDashboard');
        } else {

          const decodedToken = jwtDecode(token);
          console.log('Decoded token:', decodedToken);
          const currentTime = Math.floor(Date.now() / 1000); // Время в секундах
            if (decodedToken.exp < currentTime) {
                console.log('Token expired');
            }
          console.log('Navigating to PatientDashboard');
          console.log('Stored token:', token);
          navigation.navigate('PatientDashboard', { first_name });
        }
      } catch (err: any) {

        console.error('Login error:', err);

        setError(err.response?.data?.message || 'Login failed');
      }
    };
  
    return (
      <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
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
        <Button title="Login" onPress={handleLogin}  />
            <Button
                title="Create an account"
                onPress={() => navigation.navigate('RegistrationScreen')}
            />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    error: { color: 'red', marginBottom: 10 },
});

export default LoginScreen;
