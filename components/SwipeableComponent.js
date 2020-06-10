import React, { useState, useRef } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { StyleSheet, RefreshControl } from 'react-native'

const SwipeableComponent = (props) => {
    const swipeableRef = useRef(null);

    const swipeOpenHandler = () => {
        props.handleSwipeOpen(props.data)
        if (swipeableRef.current) {
            swipeableRef.current.close();
        }
    }

    const swipeSettings = {
        onSwipeableOpen: () => swipeOpenHandler(),
        onSwipeableLeftOpen: props.handleSwipeLeftOpen,
        onSwipeableRightOpen: props.handleSwipeRightOpen,
        onSwipeableClose: props.handleSwipeClose,
        renderLeftActions: props.renderLeftActions,
        renderRightActions: props.renderRightActions
    }

    return (
        <Swipeable ref={swipeableRef} {...swipeSettings} style={styles.swipeableContainer}>
            {props.children}
        </Swipeable>
    )
}

export default SwipeableComponent

const styles = StyleSheet.create({
    swipeableContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})
