import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DeletedScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>This is the Notes Deleted Screen</Text>
        </View>
    )
}

export default DeletedScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });