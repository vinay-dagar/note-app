import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import FormFieldInput from '../../components/FormFieldInput';
import { AntDesign } from '@expo/vector-icons';
import { debounce } from 'lodash';

const SearchScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const getNotes =  debounce(async (search) => {
        try {
            const query = { search }

            const { result } = await $http.get('search-note', query)
        } catch (err) {
            console.log(err)
        }
    }, 200)

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
                <TouchableOpacity onPress={props.navigation.pull()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <FormFieldInput
                    inputType="text"
                    placeholder="Search your notes"
                    handleChangeText={e => setSearch(e)}
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
                onRefresh={() => getNotes()}
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
        backgroundColor: "#1c1c1c",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        borderWidth: 1.5,
        borderRadius: 15,
        borderColor: '#b7bdb3',
        height: 120,
        width: DEVICE_WIDTH
    },
    searchArea: {
        fontSize: 17,
        fontFamily: 'Arial',
        fontWeight: "400",
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
    contentList: {
        marginBottom: 100,
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
