import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { CheckBox, Tile, Overlay } from 'react-native-elements';
import PropTypes from 'prop-types';

const PLACEHOLDER_TEXT_COLOR = "#696969";


const TextField = (props) => {
    return (
        <TextInput
            placeholder={props.placeholder}
            autoCorrect={props.autoCorrect}
            placeholderTextColor={props.placeholderTextColor || PLACEHOLDER_TEXT_COLOR}
            keyboardType="default"
            style={props.styles}
            maxLength={props.maxLength}
            onChangeText={(e) => props.handleChangeText(e) }
            value={props.value}
            autoFocus={props.autoFocus}
        />
    )
};

const Password = props => {
    return (
        <TextInput
            placeholder={props.placeholder}
            autoCorrect={false}
            autoCompleteType="password"
            clearButtonMode="while-editing"
            keyboardType="default"
            secureTextEntry={true}
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            maxLength={props.maxLength}
            onChangeText={props.handleChangeText}
            style={props.styles}
        />
    )
};

const TextNumber = (props) => {
    return (
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            keyboardType="numeric"
            maxLength={props.maxLength}
            onChangeText={props.handleChangeText}
            style={props.styles}
            value={props.value}
        />
    )
};

const TextArea = (props) => {
    return (
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            keyboardType="default"
            multiline={true}
            onChangeText={props.handleChangeText}
            maxLength={props.maxLength}
            scrollEnabled={true}
            numberOfLines={props.numberOfLines}
            style={props.styles}
            value={props.value}
        />
    )
};

const TextOnly = (props) => {
    return (
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            keyboardType="default"
            onChangeText={props.handleChangeText}
            maxLength={props.maxLength}
            style={props.styles}
        />
    )
};

const Checkbox = (props) => {
    return (
        <View style={props.styles}>
            <CheckBox
                title={props.title}
                checked={props.isChecked}
                center={props.isCentered}
                onPress={props.handleOnPress}
                onLongPress={props.handleLongPress}
                onIconPress={props.handleIconPress}
                checkedColor={props.checkedColor}
                checkedTitle={props.checkedTitle}
            />
        </View>
    )
};

const TileCard = (props) => {
    return (
        <View style={props.styles}>
            <Tile
                imageSrc={props.imageSource}
                caption={props.captionText}
                title={props.titleText}
                featured={props.isFeatured}
                icon={props.icon}
                imageContainerStyle={props.imageContainerStyle}
                onPress={props.handleTilePress}
                titleNumberOfLines={props.numberOfTitleLines}
            />
        </View>
    )
};

const Modal = (props) => {
    return (
        <Overlay
            isVisible={props.isVisible}
            animationType={props.animationType}
            fullScreen={props.isFullScreen}
            onDismiss={props.handleClose}
            onBackdropPress={props.handleClose}
        >
            {props.children}
        </Overlay>
    )
};

const FormFieldInput = (props) => {
    switch (props.inputType) {
        case 'text-only':
            return <TextOnly {...props} />
        case 'text-number':
            return <TextNumber {...props} />
        case 'textarea':
            return <TextArea {...props} />
        case 'password':
            return <Password {...props} />
        case 'checkbox':
            return <Checkbox {...props} />
        case 'tile':
            return <TileCard {...props} />
        case 'modal':
            return <Modal {...props} />
        default:
            return <TextField {...props} />
    }
}

FormFieldInput.propTypes = {
    inputType: PropTypes.string,
    handleChangeText: PropTypes.func,
    captionText: PropTypes.string,
    handleOnPress: PropTypes.func,
    styles: PropTypes.object,
    imageContainerStyle: PropTypes.object,
    maxLength: PropTypes.number,
    titleText: PropTypes.string,
    isVisible: PropTypes.bool,
    isFullScreen: PropTypes.bool,
    placeholder: PropTypes.string,
    handleIconPress: PropTypes.func,
    handleLongPress: PropTypes.func,
    isChecked: PropTypes.bool,
    isFeatured: PropTypes.bool,
    handleClose: PropTypes.func,
    numberOfTitleLines: PropTypes.number
};

export default FormFieldInput;
