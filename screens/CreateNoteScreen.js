import React, { useState, useEffect, useCallback } from 'react'
import { Dimensions, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import FormFieldInput from '../components/FormFieldInput';

const CreateNoteScreen = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState();
    const [noteId, setNoteId] = useState();

    useEffect(() => {
        if (props.route && props.route.params) {
            const id = props.route.params.noteId;
            setNoteId(id)
            getNoteDetail(id);
        }
    }, [props]);

    useEffect(() => {
        props.navigation.addListener('blur', () => {
            storeNote(title, content)
        })
    }, [title, content])

    const storeNote = useCallback(async () => {
        try {
            const data = {
                title,
                content,
                // image: ''
            };

            let result;
            if(noteId) {
                result = await $http.updateById('update-note', noteId, data)
            } else {
                result = await $http.rawPost('create-note', data);
            }

        } catch (err) {
            console.log(err)
        }
    }, [title, content]);

    const getNoteDetail = async (id) => {
        try {
            const { data } = await $http.getById('todo-list', id);
            if (data) {
                setTitle(data.title);
                setContent(data.content);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView style={styles.container} enabled behavior="position" collapsable={true}>
            <FormFieldInput
                inputType="text"
                styles={styles.titleText}
                placeholder="Title"
                maxLength={20}
                handleChangeText={(e) => setTitle(e)}
                value={title}
            />
            <FormFieldInput
                styles={styles.noteText}
                placeholder="Note"
                inputType="textarea"
                handleChangeText={(e) => setContent(e)}
                value={content}
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