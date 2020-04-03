import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import SectionScreen from '../screens/SectionScreen'
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" mode="modal" headerMode="none">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Section" component={SectionScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigator 