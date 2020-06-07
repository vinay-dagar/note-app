import React, { useState, useEffect, useCallback, } from 'react'
import { Dimensions, StyleSheet, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import FormFieldInput from '../../components/FormFieldInput';
import { useFocusEffect } from '@react-navigation/native';

const CreateNoteScreen = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState();
    const [noteId, setNoteId] = useState();

    useEffect(() => {
        if (props?.route?.params) {
            const { title, id, content } = props.route.params;
            setNoteId(id)
            setTitle(title)
            setContent(content)
        }
    }, [props.route.params]);

    const storeNote = async () => {
        try {
            let result;
            const data = { title, content }
            if (noteId) {
                result = await $http.updateById('update-note', noteId, data)
            } else {
                result = await $http.rawPost('create-note', data);
            }

            props.navigation.navigate('Home')
        } catch (err) {
            console.log(err)
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
            <View style={styles.saveButtonContainer}>
                <TouchableOpacity onPress={storeNote}>
                    <Text style={{ color: '#fff' }}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.pop()}>
                    <Text style={{ color: '#fff' }}>CANCEL</Text>
                </TouchableOpacity>
            </View>
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
        height: DEVICE_Height - 120,
        textAlignVertical: 'top'
    },
    saveButtonContainer: {
        margin: 10,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});