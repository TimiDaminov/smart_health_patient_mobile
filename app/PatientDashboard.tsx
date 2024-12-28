import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit'; // Импортируем график

const PatientDashboard = ({ route, navigation }) => {
    const { first_name } = route.params;
    const [healthData, setHealthData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHealthData = async () => {
            const token = await AsyncStorage.getItem('auth_token');
            console.log(token)
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://330d-78-154-129-218.ngrok-free.app/api/health', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setHealthData(response.data);
                console.log("HEALTH DATA:",healthData)
            } catch (error) {
                setError('Failed to fetch health data');
            } finally {
                setLoading(false);
            }
        };

        fetchHealthData();
    }, []);

    // Данные для графика (по текущему месяцу)
    // const graphData = healthData.filter(data => new Date(data.date).getMonth() === new Date().getMonth());
    // const pulseData = graphData.map(item => item.pulse);
    // const systolicData = graphData.map(item => item.systolic);

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

            {/* <View style={styles.chartContainer}>
                <Text style={styles.title}>Pulse Over Time</Text>
                <LineChart
                    data={{
                        labels: graphData.map((_, index) => `Day ${index + 1}`),
                        datasets: [
                            {
                                data: pulseData,
                                strokeWidth: 2,
                                color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                            },
                        ],
                    }}
                    width={350} // ширина графика
                    height={220} // высота графика
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: { borderRadius: 16 },
                        propsForDots: { r: '6', strokeWidth: '2', stroke: '#fff' },
                    }}
                    bezier
                />
            </View> */}

            <Text style={styles.welcomeText}>Welcome, {first_name}!</Text>
            <View style={styles.healthDataContainer}>
                <Text style={styles.title}>Latest Health Metrics</Text>
                {healthData.map((data) => (
                    <View key={data.id} style={styles.metricRow}>
                        <Text style={styles.timestamp}>{new Date(data.date).toLocaleString()}</Text>
                        <Text style={styles.metricLabel}>Pulse: <Text style={styles.metricValue}>{data.pulse} bpm</Text></Text>
                        <Text style={styles.metricLabel}>Blood Pressure: <Text style={styles.metricValue}>{data.systolic}/{data.diastolic} mmHg</Text></Text>
                        <Text style={styles.metricLabel}>Oxygen Level: <Text style={styles.metricValue}>{data.spo2}%</Text></Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('FullData', { healthData })}>
                <Text style={styles.viewMore}>View All Data</Text>
            </TouchableOpacity>
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
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
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
    },
    chartContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    viewMore: {
        color: '#007BFF',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '600',
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
