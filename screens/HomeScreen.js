import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity,  } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CustomFooter from '../components/CustomFooter';
import  { Feather } from '@expo/vector-icons';

const HomeScreen = (props) => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        getNotes()
    }, []);

    const getNotes = async () => {
        try {
            const result = await $http.get('todo-list');

            console.log(result)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <CustomHeader {...props} />
            <StatusBar backgroundColor="#454545"  />
            <Text>This is the Notes Home Screen</Text>

            <TouchableOpacity style={styles.floatingButton} onPress={() => {props.navigation.navigate('CreateNote')}} >
                <Feather name="plus" color="#fff" size={35} />
            </TouchableOpacity>
            <CustomFooter {...props} />
        </View>
    )
};

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_Height = Dimensions.get('window').height

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    floatingButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        left: DEVICE_WIDTH - 100,
        top: DEVICE_Height - 100,
        backgroundColor: '#363434',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    }
  });