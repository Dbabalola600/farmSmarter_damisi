
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign, MaterialIcons, Ionicons, FontAwesome6, Entypo } from "@expo/vector-icons";
import { Text, View } from 'react-native';

import MyTabBar from './CustomBottomNav';
import MapsScreen from '../screens/MapsScreen';
import HomeScreen from '../screens/HomeScreen';
import MoreScreen from '../screens/MoreScreen';



const Tab = createBottomTabNavigator();

const Marked = () => {
    return (
        <>
            {/* <View style={{ backgroundColor: 'red', height: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}></View> */}

            <View className='bg-white h-1 rounded-full  w-1 mx-auto  '></View>
        </>

    )
}

const Tabs = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
                tabBarLabel: "",
                
                
            }}
            initialRouteName='MapsScreen'

            tabBar={props => <MyTabBar {...props} />}

        >

            <Tab.Screen
                component={HomeScreen}
                name='HomeScreen'
            />

            <Tab.Screen
                name='MapsScreen'
                component={MapsScreen}


            />

            <Tab.Screen
                name='MoreScreen'
                component={MoreScreen}


            />







        </Tab.Navigator>
    )



}



export default Tabs