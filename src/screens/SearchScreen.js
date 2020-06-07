import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native'
import FormFieldInput from '../../components/FormFieldInput';
import { AntDesign } from '@expo/vector-icons';
import { debounce } from 'lodash';

const SearchScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState([]);

    const getNotes =  debounce(async (search) => {
        try {
            setIsLoading(true)
            const query = { search }
            
            const { result } = await $http.get('search-note', query)
            setIsLoading(false)
            setNotes(result)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, 700)

    const setNoteData = (item = null) => {
        let data;
        if(item) {
            data = {
                title: item.title,
                content: item.content,
                image: item.image ? item.image : '',
                id: item._id
            }
        }

        item.image ? props.navigation.navigate('CreateTile', data) : props.navigation.navigate('CreateNote', data)
    }

    const renderNotes = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainer} key={item._id} onPress={() => setNoteData(item)}>
                <View style={styles.contentContainer} key={item._id}>
                    {item.image ? <Image style={styles.image} source={{ uri: item.image }} /> : null}
                    <View style={styles.textContainer}>
                        <Text style={styles.title}> {item.title} </Text>
                        <Text style={styles.content}> {item.content} </Text>
                    </View>
                </View>
            </TouchableOpacity>
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
        <View style={styles.searchContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.pop()}>
                    <AntDesign name="arrowleft" size={30} color="#fff" />
                </TouchableOpacity>
                <FormFieldInput
                    inputType="text"
                    placeholder="Search your notes"
                    handleChangeText={e => getNotes(e)}
                    placeholderTextColor="#fff"
                    styles={styles.searchArea}
                    autoFocus={true}
                />
            </View>
            <FlatList
                style={styles.contentList}
                data={notes}
                keyExtractor={item => item.id}
                renderItem={renderNotes}
                ListEmptyComponent={dataNotFound}
                refreshing={isLoading}
                initialNumToRender={10}
                getItemLayout={(data, index) => {
                    return { length: 10, offset: 10 * index, index }
                }}
            />
        </View>
    )
}

export default SearchScreen;

const DEVICE_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#242222",
    },
    headerContainer: {
        flexDirection: "row",
        margin: 10,
        borderWidth: 1.5,
        borderRadius: 15,
        borderColor: '#696969',
        height: 60,
        width: DEVICE_WIDTH
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    searchArea: {
        fontSize: 17,
        fontWeight: "100",
        color: "#fff",
        marginLeft: 15
    },
    itemContainer: {
        width: DEVICE_WIDTH - 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#636363",
        borderRadius: 20,
        backgroundColor: "#adaaaa",
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
    contentList: {
        marginBottom: 100,
    },
    title: {
        padding: 4,
        color: "#050505",
        fontSize: 20,
        fontWeight: "800",
    },
    content: {
        color: "#292929",
        fontWeight: "400",
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
    }
})
