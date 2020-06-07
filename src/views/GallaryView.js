import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const GallaryView = (props) => {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        setPermissions();
    }, []);

    useEffect(() => {
        if (hasPermission) {
            openImage();
        }
    }, [hasPermission])

    const setPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        if (result.status !== 'granted') {
            Alert.alert(
                'Insuficient Permission',
                'Permission denined to access the gallary!',
                [{ text: 'Ok!' }]
            );
        }
        setHasPermission(result.status === 'granted');
    }

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to gallary</Text>;
    }

    const openImage = async () => {
        try {
            const image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (image.cancelled) {
                props.navigation.navigate('Home')
            } else {
                props.navigation.navigate('CreateTile', { image })
            }

        } catch (error) {
            Alert.alert('Error!', error, [{ text: 'Ok' }])
        }
    }
    return (
        <View />
    )
}

export default GallaryView;
