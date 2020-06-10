import React, {useState, useEffect} from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Dimensions, Text, Image } from 'react-native'

const DeletedScreen = (props) => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        try {
            setIsLoading(true)

            const { result } = await $http.get('get-deleted-notes');

            if (result && result.length) {
                setNotes(result);
            }
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    };

    const renderNotes = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainer} key={item._id} >
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
        <View style={styles.container}>
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

export default DeletedScreen
const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_Height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 20,
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
});