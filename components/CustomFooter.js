import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal } from 'react-native'
import { AntDesign, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const CustomFooter = (props) => {

    const [showCameraModal, setShowCameraModal] = useState(false);
    const [showAudioModal, setShowAudioModal] = useState(false);

    const handleCloseModal = () => {
        console.log('asddffsad')
    };
    const handleCaptureImage = () => {
        setShowCameraModal(false)
        props.handleCaptureImage()
    };

    const handleChooseFromGallery = () => {
        setShowAudioModal(false)
        props.handleChooseFromGallery()
    }


    return (
        <View style={styles.footerLayout}>
            {/* LIST VIEW */}
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => { props.navigation.navigate('CreateList') }}>
                    <AntDesign name="checksquareo" color="#fff" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="ios-brush" color="#fff" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => { setShowAudioModal(true) }}>
                    <Feather name="mic" color="#fff" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => { setShowCameraModal(true) }}>
                    <MaterialCommunityIcons name="image-album" color="#fff" size={25} />
                </TouchableOpacity>
            </View>
            {/* CAMERA MODAL */}
            <Modal
                visible={showCameraModal}
                onDismiss={() => { setShowCameraModal(false) }}
                animationType="slide"
                transparent={true}
                onRequestClose={() => { setShowCameraModal(false) }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modleText}>Add Image</Text>
                    <TouchableOpacity style={styles.modalButtons} onPress={handleCaptureImage}>
                        <Feather size={30} color="#fff" name="camera" />
                        <Text style={styles.modalButtonText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButtons} onPress={handleChooseFromGallery}>
                        <Feather size={30} color="#fff" name="image" />
                        <Text style={styles.modalButtonText}>Choose Image</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* Audio Modal */}
            <Modal
                visible={showAudioModal}
                onDismiss={() => { setShowAudioModal(false) }}
                animationType="slide"
                transparent={true}
                onRequestClose={() => { setShowAudioModal(false) }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modleText}>Audio Not available!</Text>
                    <Text>
                        Currently the record audio functionallity is not available.
                    </Text>
                </View>
            </Modal>
        </View>
    )
}

export default CustomFooter;
const DEVICE_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    footerLayout: {
        width: DEVICE_WIDTH,
        height: 50,
        backgroundColor: "#404040",
        bottom: 0,
        position: "absolute",
        zIndex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        left: 0,
        width: DEVICE_WIDTH - 80,
    },
    iconButton: {
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    modalContainer: {
        margin: 5,
        backgroundColor: "#737373",
        borderRadius: 0,
        padding: 20,
        shadowColor: "#c3c3ce",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.75,
        shadowRadius: 3.84,
        elevation: 5,
        alignContent: 'center',
        height: 160,
        top: 280
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modleText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700'
    },
    modalButtons: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center'
    },
    modalButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        marginLeft: 10,
        justifyContent: 'center'
    }
})
