import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import FormFieldInput from '../components/FormFieldInput';

const CreateNoteScreen = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        props.navigation.addListener('blur', () => {
            storeNote()
        })
    }, [props]);

    const storeNote = async () => {
        try {
            console.log({content, title})
            const data = {
                content,
                title,
                image: ''
            };

            const result = await $http.rawPost('create-note', data);
            console.log({result})
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView style={styles.container} enabled behavior="position" collapsable={true}>
            <FormFieldInput 
                inputType="text"
                styles={styles.titleText}
                placeholder="Title"
                maxLength={20}
                handleChangeText={(e) => setTitle(e)}
            />
            <FormFieldInput 
                styles={styles.noteText}
                placeholder="Note"
                inputType="textarea"
                handleChangeText={(e) => setContent(e)}
            />
        </SafeAreaView>
    )
}

export default CreateNoteScreen
const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_Height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1818',
        padding: 10,
        width: DEVICE_WIDTH,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        color: '#fff',
        width: DEVICE_WIDTH,
        height: 35
    },
    noteText: {
        fontSize: 14,
        fontWeight: '300',
        color: "#fff",
        padding: 10,
        borderColor: '#fff',
    }
});