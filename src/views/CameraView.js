import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CameraView = (props) => {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        setPermissions();
    }, []);

    useEffect(() => {
        if (hasPermission) {
            captureImage();
        }
    }, [hasPermission])

    const setPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        if (result.status !== 'granted') {
            Alert.alert(
                'Insuficient Permission',
                'Permission denined to access the camera!',
                [{ text: 'Ok!' }]
            );
        }
        setHasPermission(result.status === 'granted');
    }

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const captureImage = async () => {
        try {
            const image = await ImagePicker.launchCameraAsync({
                // allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5,
                base64: true
            })

            if (image.cancelled) {
                props.navigation.navigate('Home')
            } else {
                props.navigation.navigate('CreateTile', { image })
            }

        } catch (error) {
            Alert.alert('Error!', error, [{ text: 'Ok' }])
        }
    }
    return(
        <View />
    )
}

export default CameraView;
