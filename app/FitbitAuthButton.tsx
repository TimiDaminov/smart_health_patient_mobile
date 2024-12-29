
import React from 'react';
import { Button, Linking } from 'react-native';

const FitbitAuthButton = () => {
  const handleFitbitAuth = async () => {
    const authUrl = 'https://330d-78-154-129-218.ngrok-free.app/api/fitbit/auth';
    Linking.openURL(authUrl);
  };

  return <Button title="Connect Fitbit" onPress={handleFitbitAuth} />;
};

export default FitbitAuthButton;
