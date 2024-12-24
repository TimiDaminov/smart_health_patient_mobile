import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationScreen from '../RegistrationScreen';
import MainScreen from '../MainScreen';
import AddDeviceScreen from '../AddDeviceScreen';
import CalendarScreen from '../CalendarScreen';
import ManualDataEntryScreen from '../ManualDataEntryScreen';
import GoogleFitScreen from '../GoogleFitScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="ManualEntry" component={ManualDataEntryScreen} />
        <Stack.Screen name="GoogleFit" component={GoogleFitScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
