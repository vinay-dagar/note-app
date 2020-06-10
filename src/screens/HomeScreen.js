import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, FlatList, Image, Animated } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import CustomFooter from '../../components/CustomFooter';
import SwipeableComponent from '../../components/SwipeableComponent';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = (props) => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        props.navigation.addListener('focus', () => getNotes())
    }, [props.navigation]);

    const getNotes = async () => {
        try {
            setIsLoading(true)

            const { result } = await $http.get('notes-list');
            if (result && result.length) {
                setNotes(result);
            }
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    };

    const handleCaptureImage = () => {
        props.navigation.navigate('CameraView');
    }

    const handleChooseFromGallery = () => {
        props.navigation.navigate('GallaryView');
    }

    const setNoteDataAndRedirect = (item = null) => {
        let data;
        if (item) {
            data = {
                title: item.title,
                content: item.content,
                image: item.image ? item.image : '',
                id: item._id
            }
        }

        item.image ? props.navigation.navigate('CreateTile', data) : props.navigation.navigate('CreateNote', data)
    }

    const deleteNote = async (id) => {
        try {
            const filteredNotes = notes.filter(n => n._id !== id);
            setNotes(filteredNotes)
            await $http.rawPut('delete-note', id)
            getNotes()
        } catch (err) {
            console.log(err)
        }
    }

    const leftSwipeAction = (progess, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.swipeLeftContainer}>
                <Animated.View style={[styles.swipeIconContainer, { transform: [{ scale }] }]}>
                    <AntDesign size={30} name="delete" color="#fff" />
                </Animated.View>
            </View>
        )
    }

    const rightSwipeAction = (progess, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.swipeRightContainer}>
                <Animated.View style={[styles.swipeIconContainer, { transform: [{ scale }] }]}>
                    <AntDesign size={30} name="delete" color="#fff" />
                </Animated.View>
            </View>
        )
    }

    const swipeSettings = {
        autoClose: true,
        handleSwipeOpen: (data) => deleteNote(data),
        renderLeftActions: leftSwipeAction,
        renderRightActions: rightSwipeAction,
    }

    const renderNotes = ({ item, index }) => {
        return (
            <SwipeableComponent
                {...swipeSettings}
                data={item._id}
                index={index}
            >
                <TouchableOpacity style={styles.itemContainer} key={item._id} onPress={() => setNoteDataAndRedirect(item)}>
                    <View style={styles.contentContainer} key={item._id}>
                        {item.image ? <Image style={styles.image} source={{ uri: item.image }} /> : null}
                        <View style={styles.textContainer}>
                            <Text style={styles.title}> {item.title} </Text>
                            <Text style={styles.content}> {item.content} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </SwipeableComponent>
        )
    }

    const dataNotFound = () => {
        return (
            <View style={styles.notFountTextContainer}>
                <Text style={styles.notFountText}>No data found!</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CustomHeader {...props} />
            <StatusBar backgroundColor="#454545" />
            <FlatList
                style={styles.contentList}
                data={notes}
                keyExtractor={item => item.id}
                renderItem={renderNotes}
                ListEmptyComponent={dataNotFound}
                refreshing={isLoading}
                initialNumToRender={10}
                onRefresh={() => getNotes()}
                getItemLayout={(data, index) => {
                    return { length: 10, offset: 10 * index, index }
                }}
            />

            <TouchableOpacity style={styles.floatingButton} onPress={() => { props.navigation.navigate('CreateNote') }} >
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
        alignItems: "center"
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
    itemContainer: {
        width: DEVICE_WIDTH - 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#636363",
        borderRadius: 20,
        backgroundColor: "#1c1c1c",
        marginVertical: 4,
    },
    contentContainer: {
        width: '100%',
        margin: 20,
    },
    textContainer: {
        marginTop: 7,
        paddingHorizontal: 10
    },
    title: {
        padding: 4,
        color: "#fff",
        fontSize: 20,
        fontWeight: "800",
    },
    content: {
        color: "#fff",
        fontWeight: "400",
    },
    contentList: {
        marginBottom: 100,
    },
    image: {
        width: '100%',
        minHeight: 100,
        minWidth: 200,
        height: 300
    },
    notFountTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFountText: {
        fontSize: 12,
        fontWeight: "200",
        color: "#1c1c1c"
    },
    swipeLeftContainer: {
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#ffcbc7',
        width: '100%',
        borderRadius: 15,
        marginVertical: 5,
    },
    swipeIconContainer: {
        marginLeft: 20
    },
    swipeRightContainer: {
        alignItems: 'flex-end',
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#ffcbc7',
        width: '100%',
        borderRadius: 15,
    },
});