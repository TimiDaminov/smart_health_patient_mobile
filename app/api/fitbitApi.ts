import axios from 'axios';

const BASE_URL = ' https://330d-78-154-129-218.ngrok-free.app/fitbit';


export const getFitbitAuthUrl = async (): Promise<string> => {
  return `${BASE_URL}/auth`;
};

// Получение данных с Fitbit API через бэкенд
export const fetchFitbitData = async (accessToken: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/data`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Fitbit data', error);
    throw new Error('Failed to fetch Fitbit data');
  }
};
