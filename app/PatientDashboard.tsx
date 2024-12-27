import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientDashboard = ({ route }) => {
    const { first_name } = route.params;
    const [healthData, setHealthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHealthData = async () => {
            const token = await AsyncStorage.getItem('auth_token');  // Получаем токен из AsyncStorage
            console.log('Token:', token);  // Выводим токен в консоль для отладки
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://330d-78-154-129-218.ngrok-free.app/api/health', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('Fetched health data:', response.data);  // Выводим данные из ответа
                setHealthData(response.data); // Обновляем состояние с данными
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.welcomeText}>Welcome, {first_name}!</Text>
            <View style={styles.healthDataContainer}>
                <Text style={styles.title}>Health Metrics</Text>
                {healthData && healthData.length > 0 ? (
                    healthData.map((data, index) => (
                        <View key={data.id} style={styles.metricRow}>
                            <Text style={styles.timestamp}>{new Date(data.timestamp).toLocaleString()}</Text>
                            <Text style={styles.metricLabel}>Pulse:</Text>
                            <Text style={styles.metricValue}>{data.pulse} bpm</Text>
                            <Text style={styles.metricLabel}>SpO2:</Text>
                            <Text style={styles.metricValue}>{data.spo2} %</Text>
                            <Text style={styles.metricLabel}>Blood Pressure:</Text>
                            <Text style={styles.metricValue}>{data.systolic}/{data.diastolic} mmHg</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No health data available</Text>
                )}
            </View>
        </ScrollView>
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
    healthDataContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 15,
    },
    metricRow: {
        marginBottom: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    timestamp: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 8,
    },
    metricLabel: {
        fontSize: 16,
        color: '#495057',
        fontWeight: '600',
        marginTop: 5,
    },
    metricValue: {
        fontSize: 16,
        color: '#007BFF',
        marginTop: 5,
    },
    noDataText: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
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
