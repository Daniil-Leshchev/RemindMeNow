import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const index = () => {
    const session = false;
    if (!session) {
        return <Redirect href={'/sign-in'}/>
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Stack.Screen options={{headerShown: false}}/>
        <Text>Some text</Text>
      </View>
    );
  };
  
  export default index;