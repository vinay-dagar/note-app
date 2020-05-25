import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, FlatList  } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import CustomFooter from '../../components/CustomFooter';
import  { Feather } from '@expo/vector-icons';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

const HomeScreen = (props) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes()
    }, []);

    const getNotes = async () => {
        try {
            const {result} = await $http.get('todo-list');
            if(result && result.length) {
                setNotes(result);
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleCaptureImage = () => {
        props.navigation.navigate('CameraView');
    }

    const handleChooseFromGallery = () => {
        console.log('Choose from gallary')
    }

    const renderNotes = ({item}) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('CreateNote', { noteId: item._id })}>
                <Card style={styles.contentContainer} key={item.key} title={item.title}>
                    <Text style={styles.content}> {item.content} </Text>
                </Card>
            </TouchableOpacity>
        )
    }

    const dataNotFound = () => {
        return (
            <View>
                <Text>No data found!</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CustomHeader {...props} />
            <StatusBar backgroundColor="#454545"  />
            <FlatList 
                style={styles.contentList}
                data={notes}
                keyExtractor={item => item.id}
                renderItem={renderNotes}
                ListEmptyComponent={dataNotFound}
            />

            <TouchableOpacity style={styles.floatingButton} onPress={() => {props.navigation.navigate('CreateNote')}} >
                <Feather name="plus" color="#fff" size={35} />
            </TouchableOpacity>
            <CustomFooter 
                handleCaptureImage={handleCaptureImage} 
                handleChooseFromGallery={handleChooseFromGallery} 
                {...props} 
            />
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
    },
    contentContainer: {
        width: DEVICE_WIDTH - 100,
        justifyContent: 'center',
        color: "#fff",
        borderColor: "#636363",
        backgroundColor: "#262626",
        fontWeight: "700",
        borderRadius: 20
    },
    content: {
        color: "#000",
        fontWeight: "300",
    },
    contentList: {
        marginBottom: 80,
    }
  });