import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/allroutes";
import MapsScreen from "../screens/MapsScreen";
import Tabs from "./Tabs";



const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTitle: "",
                headerStyle: {
                    backgroundColor: "transparent"
                },
                headerShadowVisible: false
            }}
            initialRouteName='MapsScreen'
        >


            <Stack.Screen
                name="MapsScreen"
                component={Tabs}
            />
        </Stack.Navigator>

    )

}



export default AuthStack