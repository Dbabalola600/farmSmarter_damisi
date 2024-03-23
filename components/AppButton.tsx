
import React from "react";
import { GestureResponderEvent, Pressable, Text, StyleSheet } from "react-native";


type AppButtonProp = {
    text?: React.ReactNode;
    // buttonStyle?: Style;
    // textStyle?: string;
    disabled?: boolean;
    isCustom?: boolean;
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};








const AppButton = (props: AppButtonProp) => {
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: props.disabled
                        ? "#D0D5DD"
                        : pressed
                            ? "rgba(0, 0, 0, 0.75)" 
                            : "black",
                    width: "100%",
                    padding: 10,
                    borderRadius: 10,
                },
                styles.button,
            ]}
            onPress={props.disabled != true ? props.onPress : () => { }}
        >
            <Text style={styles.textStyle}>
                {props.text}
            </Text>
        </Pressable>
    );
};

export default AppButton;





const styles = StyleSheet.create({
    button: {
        //   backgroundColor: "black",
        padding: 10,
        borderRadius: 10

    },
    textStyle: {
        textAlign: "center",
        color: "white",
        fontSize: 15

    }
})