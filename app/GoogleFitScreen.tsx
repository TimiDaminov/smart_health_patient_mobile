import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit'

const GoogleFitScreen = () => {

    useEffect(() => {
        const options = {
            scopes: [
                Scopes.FITNESS_ACTIVITY_READ,
                Scopes.FITNESS_ACTIVITY_WRITE,
                Scopes.FITNESS_BODY_READ,
                Scopes.FITNESS_BODY_WRITE,
            ]
        };
        GoogleFit.authorize(options).then(authResult => {
            if (authResult.success) {
                console.log('AUTH_SUCCESS')
            }
            else {
                console.log('AUTH_DENIED', authResult)
            }
        })
    }, [])

}

export default GoogleFitScreen;
