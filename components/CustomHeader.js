import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const CustomHeader = ({ navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="ios-menu" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={styles.searchText}> Search your Notes </TouchableOpacity>
            <AntDesign name="smile-circle" size={28} color="#fff" />
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 7,
        padding: 10,
        borderWidth: 1,
        backgroundColor: '#3b3b3b',
        borderRadius: 5,
        height: 50,
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'center',
        width: '95%'
    },
    searchText: {
        fontSize: 25,
        color: '#c3c3ce',
        fontWeight: '400'
    }
})
