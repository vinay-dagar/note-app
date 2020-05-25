import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SettingScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>This is the Notes Home Screen</Text>
        </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });