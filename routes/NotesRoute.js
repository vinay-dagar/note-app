import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import HomeScreen from '../src/screens/HomeScreen';
import CreateNote from '../src/screens/CreateNoteScreen';
import CreateList from '../src/screens/CreateListScreen';
import DeletedNotes from '../src/screens/DeletedNotesScreen';
import Settings from '../src/screens/SettingsScreen';
import CreateTile from '../src/screens/CreateTileScreen';

// View
import CameraView from '../src/views/CameraView';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator drawerStyle={{
        backgroundColor: '#3b3b3b',
    }} drawerContentOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        activeBackgroundColor: '#bfb82c',
        contentContainerStyle: {
            fontWeight: 600
        }
    }}>
        <Drawer.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='DeletedNotes' component={DeletedNotes} />
        <Stack.Screen name='Settings' component={Settings} />

    </Drawer.Navigator>
)

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={DrawerNavigator} />
                <Stack.Screen name='CreateNote' component={CreateNote} />
                <Stack.Screen name='CreateList' component={CreateList} />
                <Stack.Screen name='CreateTile' component={CreateTile} />
                <Stack.Screen name='CameraView' component={CameraView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Routes;