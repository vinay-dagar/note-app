import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import FormFieldInput from '../../components/FormFieldInput';

const CreateTileScreen = (props) => {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        if(props.route.params) {
            const image = props.route.params.image;

            if(image) {
                console.log(image)
                setImageUrl(image.uri)
            }
        }
    }, [props.route])

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
                maxLength={20}
                handleChangeText={(e) => setCaption(e)}
                value={title}
            />
            <View style={styles.imageContainer}>
                {
                    imageUrl ? (<Image style={styles.image} source={{uri: imageUrl}} resizeMode='cover' />) :  (<Text>No image selected</Text>)
                }
            </View>
            <Text> Save </Text>
            <Text> Cancel </Text>
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
        color: '#fff',
        width: DEVICE_WIDTH,
        height: 35,
        marginVertical: 18
    },
    captionText: {
        fontSize: 14,
        fontWeight: '300',
        color: "#fff",
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
    }
})
