import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  { Ionicons, AntDesign } from '@expo/vector-icons';

const CustomHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Ionicons name="ios-menu" size={30} color="#fff" />
            <Text style={styles.searchText}> Search your Notes </Text>
            <AntDesign name="smile-circle" size={28} color="#fff" />
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    headerContainer: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        backgroundColor: '#3b3b3b',
        borderRadius: 5,
        height: 50,
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'center'
    },
    searchText: {
        fontSize: 25,
        color: '#c3c3ce',
        fontWeight: '400'
    }
})
