import { ScrollView, Text, View } from "react-native"
import React from "react"





const HomeScreen = () => {
    return (
        <ScrollView
            contentContainerStyle={{ flex: 1, flexGrow: 1 }}
            className=" "
        >

            <View className="flex-1 justify-start  pb-20 px-5 pt-44">

                <Text
                className="text-center"
                >
                    this is the home screen with home screen stuff 
                </Text>
            </View>




        </ScrollView>
    )
}



export default HomeScreen