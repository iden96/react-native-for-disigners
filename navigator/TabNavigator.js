import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SectionScreen from '../screens/SectionScreen'
import { Ionicons } from '@expo/vector-icons'
import CoursesScreen from '../screens/CoursesScreen'
import ProjectsScreen from '../screens/ProjectsScreen'
import VideoScreen from '../screens/VideoScreen'

const Stack1Tab = createStackNavigator()
const Stack2Tab = createStackNavigator()
const Stack3Tab = createStackNavigator()
const Tab = createBottomTabNavigator()

const activeColor = "#4775f2"
const inactiveColor = "#b8bece"

const HomeStack = () => (
    <Stack1Tab.Navigator initialRouteName="Home" mode="modal" headerMode="none">
        <Stack1Tab.Screen name="Home" component={HomeScreen} />
        <Stack1Tab.Screen name="Section" component={SectionScreen} />
        <Stack1Tab.Screen name="Video" component={VideoScreen} />
    </Stack1Tab.Navigator>
)

const CoursesStack = () => (
    <Stack2Tab.Navigator headerMode="none">
        <Stack2Tab.Screen name="Courses" component={CoursesScreen} />
    </Stack2Tab.Navigator>
)

const ProjectsStack = () => (
    <Stack3Tab.Navigator headerMode="none">
        <Stack3Tab.Screen name="Projects" component={ProjectsScreen} />
    </Stack3Tab.Navigator>
)


const TabNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={({ route }) => {
                    let tabBarVisible = true

                    const routeName = (route.state) ? route.state.routes[route.state.index].name : {}

                    if (routeName == "Section" || routeName == "Video") tabBarVisible = false
                    return {
                        tabBarVisible,
                        tabBarLabel: "Home",
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="ios-home" size={26} color={focused ? activeColor : inactiveColor} />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="CoursesStack"
                component={CoursesStack}
                options={{
                    tabBarLabel: "Courses",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="ios-albums" size={26} color={focused ? activeColor : inactiveColor} />
                    )
                }}
            />
            <Tab.Screen
                name="ProjectsStack"
                component={ProjectsStack}
                options={() => {
                    return {
                        tabBarLabel: "Projects",
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="ios-folder" size={26} color={focused ? activeColor : inactiveColor} />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
)

export default TabNavigator