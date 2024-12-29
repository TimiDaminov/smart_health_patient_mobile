import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

const FitbitProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://330d-78-154-129-218.ngrok-free.app/api/fitbit/profile', {
        params: {
          accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1BXR0oiLCJzdWIiOiJDRFA3NUMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByaXJuIHJveHkgcm51dCBycHJvIHJzbGUgcmNmIHJhY3QgcnJlcyBybG9jIHJ3ZWkgcmhyIHJ0ZW0iLCJleHAiOjE3MzU1Mjk1NjUsImlhdCI6MTczNTUwMDc2NX0.zs_EXNAx6DR82z7ehtJXifPLpK1VIiLzCi49CWEkFLA', 
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Button title="Fetch Fitbit Profile" onPress={fetchProfile} />
      {loading && <ActivityIndicator />}
      {profile && (
        <Text>
          Name: {profile.user.displayName} {'\n'}
          Age: {profile.user.age} {'\n'}
          Gender: {profile.user.gender}
        </Text>
      )}
    </View>
  );
};

export default FitbitProfile;
