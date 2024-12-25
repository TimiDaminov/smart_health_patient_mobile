import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationScreen from '../RegistrationScreen';
import MainScreen from '../MainScreen';
import AddDeviceScreen from '../AddDeviceScreen';
import CalendarScreen from '../CalendarScreen';
import ManualDataEntryScreen from '../ManualDataEntryScreen';
import GoogleFitScreen from '../GoogleFitScreen';
import Login from '../Login';
import PatientDashboard from '../PatientDashboard';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="ManualEntry" component={ManualDataEntryScreen} />
        <Stack.Screen name="GoogleFit" component={GoogleFitScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
