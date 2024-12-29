import { useState, useEffect } from 'react'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import {Platform } from 'react-native'

export interface PushNotificationState{
    notification?:Notifications.Notification;
    expoPushToken?:Notifications.ExpoPushToken; 
}

export const usePushNotifications = (): PushNotificationState =>{

    Notifications.setNotificationHandler({
        handleNotification: async () => {
            shouldPlaySound:true,
            shouldShowAlert:true,
            shouldSetBadge:true
        }
    })
}