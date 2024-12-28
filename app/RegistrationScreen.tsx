
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
const RegistrationScreen = () => {
    const [isDoctor, setIsDoctor] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        specialty: '',
        licenseNumber: '',
        hospital: '',
    });

    const specialties = [
        'Therapist',
        'Cardiologist',
        'Neurologist',
        'Surgeon',
        'Pediatrician',
        'Endocrinologist',
        'Gynecologist',
    ];

    const handleChange = (key:any, value:any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
            Alert.alert('Error', 'Please fill out all required fields.');
            return;
        }

        if (isDoctor && (!formData.specialty || !formData.licenseNumber || !formData.hospital)) {
            Alert.alert('Error', 'Please fill out specialty, license number, and hospital details for doctors.');
            return;
        }

        try {
            const response = await fetch('https://330d-78-154-129-218.ngrok-free.app/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, isDoctor }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Registration successful!');
            } else {
                Alert.alert('Error', result.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Register</Text>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={formData.first_name}
                onChangeText={(value) => handleChange('first_name', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={formData.last_name}
                onChangeText={(value) => handleChange('last_name', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry
            />

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={[styles.checkbox, isDoctor && styles.checkedCheckbox]}
                    onPress={() => setIsDoctor(!isDoctor)}
                />
                <Text style={styles.checkboxLabel}>I am a doctor</Text>
            </View>

            {isDoctor && (
                <>
                    <Picker
                        selectedValue={formData.specialty}
                        style={styles.picker}
                        onValueChange={(value) => handleChange('specialty', value)}
                    >
                        <Picker.Item label="Select Specialty" value="" />
                        {specialties.map((specialty) => (
                            <Picker.Item key={specialty} label={specialty} value={specialty} />
                        ))}
                    </Picker>
                    <TextInput
                          value={formData.licenseNumber}
                          onChangeText={(value) => handleChange('licenseNumber',value)}
                          keyboardType="numeric"
                          maxLength={6}
                          placeholder="Enter 6-digit license number"
                          style={styles.input}
                        />

                    <TextInput
                        style={styles.input}
                        placeholder="Your Hospital"
                        value={formData.hospital}
                        onChangeText={(value) => handleChange('hospital', value)}
                    />
                </>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#007BFF',
        marginRight: 10,
    },
    checkedCheckbox: {
        backgroundColor: '#007BFF',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    picker: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegistrationScreen;

