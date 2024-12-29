// import React from 'react';
// import { TouchableOpacity, View, Text, Linking, StyleSheet } from 'react-native';

// const FitbitIntegration: React.FC = () => {
//     const handleConnectFitbit = async () => {
//         const fitbitAuthUrl = 'https://330d-78-154-129-218.ngrok-free.app/api/fitbit/auth';
//         try {
//             const supported = await Linking.canOpenURL(fitbitAuthUrl);
//             if (supported) {
//                 await Linking.openURL(fitbitAuthUrl);
//             } else {
//                 Alert.alert('Ошибка', 'Не удалось открыть ссылку для авторизации Fitbit.');
//             }
//         } catch (error) {
//             Alert.alert('Ошибка', 'Произошла непредвиденная ошибка.');
//         }
//     };
//     return (
//         <View style={styles.container}>
//         <TouchableOpacity style={styles.button} onPress={handleConnectFitbit}>
//           <Text style={styles.buttonText}>Connect to Fitbit</Text>
//         </TouchableOpacity>
//       </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#f4f4f4",
//     },
//     button: {
//       backgroundColor: "#4CAF50",
//       paddingVertical: 15,
//       paddingHorizontal: 30,
//       borderRadius: 8,
//       elevation: 3, // тень на Android
//       shadowColor: "#000", // тень на iOS
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.25,
//       shadowRadius: 3.84,
//     },
//     buttonText: {
//       color: "#fff",
//       fontSize: 18,
//       fontWeight: "bold",
//       textAlign: "center",
//     },
//   });
  

// export default FitbitIntegration;
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Alert } from 'react-native';

// URL для авторизации
const clientId = '23PWGJ'; 
const redirectUri = 'https://330d-78-154-129-218.ngrok-free.app/fitbit/confirmation'; 
const clientSecret = '15d51609bca0385f533b5f090527c037'; 

const FitbitScreen = () => {
  const [accessToken, setAccessToken] = useState(null);
  console.log("ACCESS TOKEN :",accessToken)
  const getAuthorizationUrl = () => {
    const scope = 'activity heartrate nutrition profile  sleep weight oxygen_saturation  electrocardiogram';
    return `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  useEffect(() => {
    const handleUrl = (event) => {
        const url = event.url;
        console.log("URL",url)
        const code = new URL(url).searchParams.get('code');
        console.log('CODE:',code)
      if (code) {
        exchangeCodeForToken(code); 
      }
    };

    
    const subscription = Linking.addListener('url', handleUrl);
    return () => {
      subscription.remove();
    };
  }, []);

  const exchangeCodeForToken = async (code) => {
    try {
      const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
      const response = await fetch('https://api.fitbit.com/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: authHeader,
        },
        body: `client_id=${clientId}&grant_type=authorization_code&redirect_uri=${redirectUri}&code=${code}`,
      });

        const data = await response.json();
        console.log(data)
      if (data.access_token) {
        setAccessToken(data.access_token); 
        fetchUserProfile(data.access_token); // Получить данные пользователя
      } else {
        Alert.alert('Ошибка', 'Не удалось получить токен доступа');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при обмене кода на токен');
    }
  };

  // Получение данных пользователя (профиля)
  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('https://api.fitbit.com/1/user/-/profile.json', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data) {
        console.log('User Profile:', data);
        Alert.alert('Success', 'Fitbit подключен успешно');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось получить данные пользователя');
    }
  };

  // Открыть URL для авторизации
  const handleConnectFitbit = () => {
    Linking.openURL(getAuthorizationUrl());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fitbit Integration</Text>
      <TouchableOpacity style={styles.button} onPress={handleConnectFitbit}>
        <Text style={styles.buttonText}>Connect to Fitbit</Text>
      </TouchableOpacity>

      {accessToken ? (
        <Text style={styles.successText}>Successfully connected to Fitbit!</Text>
      ) : (
        <Text style={styles.instructionText}>Please connect your Fitbit account.</Text>
      )}
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
  successText: {
    marginTop: 20,
    color: 'green',
    fontSize: 18,
  },
  instructionText: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default FitbitScreen;
