import { Redirect, Stack } from "expo-router";
import React = require("react");
import { Text, View } from "react-native";

const index = () => {
    const session = true;
    if (!session) {
        return <Redirect href={'/sign-up'}/>
    }
    return <Redirect href={'/(user)'}/>
  };
  
  export default index;