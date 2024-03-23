import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons, Feather, FontAwesome6, Entypo } from "@expo/vector-icons";
type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};


const Marked = () => {
  return (
    <>
      {/* <View style={{ backgroundColor: 'red', height: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}></View> */}

      <View className='bg-white h-1 mt-1 rounded-full  w-1 mx-auto  '></View>
    </>

  )
}


function MyTabBar({ state, descriptors, navigation }: TabBarProps) {
  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: "black",
      height: 70,
      borderRadius: 90,
      alignItems: 'center',
      justifyContent:"center",
      marginBottom: 20,
      marginHorizontal: 10,
      ...styles.container,
    }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };



        const renderIcon = (focused: any) => {
          switch (route.name) {
            case "HomeScreen":
              return (
                <View>
                  <FontAwesome6
                    name="house-chimney"
                    color={"white"}
                    size={26} />

                  {focused &&
                    <Marked />

                  }
                </View>
              )
              break;
            case "MapsScreen":
              return (
                <View>
                  <Entypo
                    name="map"
                    color={"white"}
                    size={26} />

                  {focused &&
                    <Marked />

                  }
                </View>
              )
              break;
              case "MoreScreen":
                return (
                  <View>
                    <Feather
                      name="more-horizontal"
                      color={"white"}
                      size={26} />
  
                    {focused &&
                      <Marked />
  
                    }
                  </View>
                )
                break;
  
            default:
              break;
          }
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }} // Corrected type annotation
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}
            key={route.key}
          >

            <View>{renderIcon(isFocused)}</View>
            <Text
            // style={{ color: isFocused ? '#673ab7' : '#222' }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar



const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1, // Optional: Add a border at the bottom to separate the shadow
    borderBottomColor: 'rgba(0, 0, 0, 0.1)', // Optional: Border color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2, // Needed for Android
  },
});
