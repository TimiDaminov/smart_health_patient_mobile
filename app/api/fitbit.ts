

import axios from 'axios';

const SERVER_URL = 'https://330d-78-154-129-218.ngrok-free.app';

export const fetchUserProfile = async (accessToken: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/fitbit/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }
};
