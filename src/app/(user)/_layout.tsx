import React = require("react");
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainScreen from ".";
import { Stack } from "expo-router";
const Drawer = createDrawerNavigator();
export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Main'}}/>
    </Stack>
  )
}