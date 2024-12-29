// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, ActivityIndicator, StyleSheet,TouchableOpacity } from 'react-native';
// import FitbitWebView from './FitbitWebView';
// import { getFitbitAuthUrl, fetchFitbitData } from './api/fitbitApi';

// const FitbitAuthScreen: React.FC = () => {
//   const [authUrl, setAuthUrl] = useState<string | null>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [fitbitData, setFitbitData] = useState<any | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAuthUrl = async () => {
//       try {
//         const url = await getFitbitAuthUrl();
//         console.log('Auth URL:', url); // Для отладки
//         setAuthUrl(url);
//       } catch (err) {
//         console.error('Failed to fetch authorization URL:', err);
//         setError('Failed to fetch authorization URL');
//       }
//     };

//     fetchAuthUrl();
//   }, []);

//   const handleAuthComplete = (token: string) => {
//     console.log('Access token received:', token); // Для отладки
//     setAccessToken(token);
//   };

//   const handleFetchData = async () => {
//     if (!accessToken) {
//       setError('Access token is missing');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const data = await fetchFitbitData(accessToken);
//       setFitbitData(data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch Fitbit data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {loading && <ActivityIndicator size="large" color="#0000ff" />}
//       {error && <Text style={styles.error}>{error}</Text>}

//       {!accessToken && authUrl && (
//         <FitbitWebView authUrl={authUrl} onAuthComplete={handleAuthComplete} />
//       )}

// <View style={styles.container}>
//             <Text style={styles.header}>Fitbit Integration</Text>
//             <TouchableOpacity style={styles.button} onPress={handleConnectFitbit}>
//                 <Text style={styles.buttonText}>Подключить Fitbit</Text>
//             </TouchableOpacity>
//         </View>
//       {accessToken && (
//         <>
//           <Text style={styles.success}>Logged in successfully!</Text>
//           <Button title="Fetch Fitbit Data" onPress={handleFetchData} />
//         </>
//       )}

//       {fitbitData && (
//         <View>
//           <Text>Fitbit Data:</Text>
//           <Text>{JSON.stringify(fitbitData, null, 2)}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 20,
//   },
//   success: {
//     color: 'green',
//     marginBottom: 20,
//   },
// });

// export default FitbitAuthScreen;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';

const FitbitAuthScreen = () => {
    const handleConnectFitbit = () => {
        const clientId = '23PWGJ'; 
        const redirectUri = 'https://330d-78-154-129-218.ngrok-free.app/fitbit/confirmation'; // Ваш Redirect URI
        const scope = 'activity heartrate sleep'; // Необходимые разрешения

        const fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&scope=${scope}`;

        Linking.openURL(fitbitAuthUrl).catch((err) =>
            Alert.alert('Ошибка', 'Не удалось открыть URL авторизации Fitbit.')
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Fitbit Integration</Text>
            <TouchableOpacity style={styles.button} onPress={handleConnectFitbit}>
                <Text style={styles.buttonText}>Подключить Fitbit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FitbitAuthScreen;
