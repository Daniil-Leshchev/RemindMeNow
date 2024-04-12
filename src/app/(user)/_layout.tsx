import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import React from "react";
//тут добавить drawer navigator после регистрации
export default function MenuStack() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{title: 'Main'}}/>
        </Stack>
    )
}