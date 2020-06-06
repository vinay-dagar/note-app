import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import FormFieldInput from '../../components/FormFieldInput';


const CreateTileScreen = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [imageObject, setImageObject] = useState();
    const [imageUrl, setImageUrl] = useState();


    useEffect(() => {
        if (props.route.params) {
            const { image, title, content } = props.route.params;

            let imageSourse = image.uri ? image.uri : image
            let base64Img = `data:image/jpg;base64,${image.base64}`;
            setImageObject(base64Img)
            setImageUrl(imageSourse)
            setTitle(title);
            setCaption(content)
        }
    }, [props.route]);

    const saveImage = async () => {
        try {
            const axios = Axios.create();
            const formData = new FormData();

            formData.append("file", imageObject)
            formData.append("upload_preset", utilities.ENV.COUDINARY_UNSIGNED_PRESET_ID);

            if (props.folderName) formData.append("folder", 'todo-app');

            const { data } = await axios.post(utilities.ENV.CLOUDINARY_UPLOAD_URL, formData);

            if (data) createTile(data.secure_url)

        } catch (err) {
            console.log(err)
        }
    }

    const createTile = async (image) => {
        try {
            const todoContent = {
                title,
                content: caption,
                image
            }
            const { data } = await $http.rawPost('create-note', todoContent);
            if (data)
                props.navigation.navigate('Home')
        } catch (err) {
            Alert.alert('Something went wrong!', err.message)
        }
    }

    return (
        <View style={styles.container}>
            <FormFieldInput
                inputType="text"
                styles={styles.titleText}
                placeholder="Enter Title"
                maxLength={20}
                handleChangeText={(e) => setTitle(e)}
                value={title}
            />
            <FormFieldInput
                inputType="textarea"
                styles={styles.captionText}
                placeholder="Enter Caption"
                handleChangeText={(e) => setCaption(e)}
                value={caption}
            />
            <View style={styles.imageContainer}>
                {
                    imageUrl ? (<Image style={styles.image} source={{ uri: imageUrl }} resizeMode='cover' />) : (<Text>No image selected</Text>)
                }
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#636363" }]}
                    onPress={() => saveImage()}
                >
                    <Text style={styles.buttonText}> Save </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#1c1c1c" }]}
                    onPress={() => props.navigation.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateTileScreen

const DEVICE_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        color: '#000',
        width: DEVICE_WIDTH,
        height: 35,
        marginVertical: 18
    },
    captionText: {
        fontSize: 14,
        fontWeight: '300',
        color: "#000",
        width: DEVICE_WIDTH,
        padding: 10,
        borderColor: '#fff',
        marginBottom: 8
    },
    imageContainer: {
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#c3c3c3',
        height: 300,
        alignContent: 'center',
        width: 350,
        marginTop: 10
    },
    image: {
        width: '100%',
        minHeight: 100,
        minWidth: 200,
        height: 300
    },
    buttonContainer: {
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: DEVICE_WIDTH,
        marginVertical: 20,
    },
    button: {
        borderWidth: 2,
        borderRadius: 10,
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        height: 55
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: "#fff",
    }
})
