import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientDashboard = ({ route }) => {
    const { first_name } = route.params;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHealthData = async () => {
            const token = await AsyncStorage.getItem('auth_token');
            console.log('Token:', token);  // Выводим токен в консоль
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://08ac-78-154-129-218.ngrok-free.app/api/health', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('Fetched health data:', response.data);  // Выводим данные из ответа
            } catch (error) {
                setError('Failed to fetch health data');
                console.error('Error fetching health data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHealthData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text>Loading health data...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, {first_name}!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});

export default PatientDashboard;
