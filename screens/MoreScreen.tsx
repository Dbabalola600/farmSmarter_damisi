import { ScrollView, View, Text } from "react-native"
import React from "react"





const MoreScreen = () => {
    return (

            <ScrollView
                contentContainerStyle={{ flex: 1, flexGrow: 1 }}
                className=" "
            >

                <View className="flex-1 justify-start  pb-20 px-5 pt-44">

                    <Text
                        className="text-center text-xl"
                    >
                        this is the more screen with more screen stuff
                    </Text>
                </View>




            </ScrollView>


    )
}



export default MoreScreen