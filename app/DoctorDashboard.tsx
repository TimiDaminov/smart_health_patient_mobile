// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import axios from 'axios';

// interface Patient {
//     patient_id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     created_at: string;
// }

// const DoctorDashboard: React.FC<{ doctorId: number }> = ({ doctorId }) => {
//     const [patients, setPatients] = useState<Patient[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchPatients = async () => {
//             try {
//                 const response = await axios.get(`https://330d-78-154-129-218.ngrok-free.app/api/doctors/2/patients`);
//                 setPatients(response.data.patients);
//             } catch (error) {
//                 Alert.alert(
//                     'Error',
//                     error.response?.data?.message || 'Failed to fetch patients. Try again later.'
//                 );
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPatients();
//     }, []);

//     const renderPatient = ({ item }: { item: Patient }) => (
//         <View style={styles.card}>
//             <Text style={styles.name}>
//                 {item.first_name} {item.last_name}
//             </Text>
//             <Text style={styles.detail}>Email: {item.email}</Text>
//             <Text style={styles.detail}>Registered: {new Date(item.created_at).toLocaleDateString()}</Text>
//         </View>
//     );

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Patients List</Text>
//             {patients.length > 0 ? (
//                 <FlatList
//                     data={patients}
//                     keyExtractor={(item) => item.patient_id.toString()}
//                     renderItem={renderPatient}
//                     contentContainerStyle={styles.list}
//                 />
//             ) : (
//                 <Text style={styles.noData}>No patients found.</Text>
//             )}
//         </View>
//     );
// };

// export default DoctorDashboard;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#f9f9f9',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     card: {
//         backgroundColor: '#fff',
//         padding: 16,
//         marginBottom: 8,
//         borderRadius: 8,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         shadowOffset: { width: 0, height: 2 },
//         elevation: 3,
//     },
//     name: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     detail: {
//         fontSize: 14,
//         color: '#555',
//         marginTop: 4,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     list: {
//         paddingBottom: 16,
//     },
//     noData: {
//         textAlign: 'center',
//         fontSize: 16,
//         color: '#999',
//     },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

interface Patient {
    patient_id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    health: {
        pulse: number;
        spo2: number;
        systolic: number;
        diastolic: number;
        timestamp: string;
    };
}

const DoctorDashboard: React.FC<{ doctorId: number }> = ({ doctorId }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`https://330d-78-154-129-218.ngrok-free.app/api/doctors/2/patients`);
                setPatients(response.data.patients);
            } catch (error) {
                Alert.alert(
                    'Error',
                    error.response?.data?.message || 'Failed to fetch patients. Try again later.'
                );
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, [doctorId]);

    const renderPatient = ({ item }: { item: Patient }) => (
        <View style={styles.card}>
            <Text style={styles.name}>
                {item.first_name} {item.last_name}
            </Text>
            <Text style={styles.detail}>Email: {item.email}</Text>
            <Text style={styles.detail}>Registered: {new Date(item.created_at).toLocaleDateString()}</Text>

            {/* Добавляем последние показатели здоровья */}
            <View style={styles.healthInfo}>
                {item.health ? (
                    <>
                        <Text style={styles.healthText}>Pulse: {item.health.pulse} bpm</Text>
                        <Text style={styles.healthText}>SpO2: {item.health.spo2}%</Text>
                        <Text style={styles.healthText}>BP: {item.health.systolic}/{item.health.diastolic} mmHg</Text>
                        <Text style={styles.healthText}>Last Recorded: {new Date(item.health.timestamp).toLocaleDateString()}</Text>
                    </>
                ) : (
                    <Text style={styles.noData}>No health data available</Text>
                )}
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Patients List</Text>
            {patients.length > 0 ? (
                <FlatList
                    data={patients}
                    keyExtractor={(item) => item.patient_id.toString()}
                    renderItem={renderPatient}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.noData}>No patients found.</Text>
            )}
        </View>
    );
};

export default DoctorDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detail: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    healthInfo: {
        marginTop: 12,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    healthText: {
        fontSize: 14,
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingBottom: 16,
    },
    noData: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
    },
});
