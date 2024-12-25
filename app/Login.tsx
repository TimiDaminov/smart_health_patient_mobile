import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { HelloWave } from '@/components/HelloWave';
import { ExternalLink } from '@/components/ExternalLink';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://08ac-78-154-129-218.ngrok-free.app/api/auth/login', { email, password });
            const { token, userId, role,first_name } = response.data;

            console.log('Login successful:', { token, userId, role,first_name });

            // Сохранить токен для последующих запросов
            // Вы можете использовать AsyncStorage или SecureStore
            // await AsyncStorage.setItem('token', token);

            if (role === 'doctor') {
                navigation.navigate('DoctorDashboard'); 
            } else {
                navigation.navigate('PatientDashboard',[first_name]); 
            }
        } catch (err: any) {
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
