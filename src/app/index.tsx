import { Redirect } from "expo-router";
import React from 'react';
const index = () => {
    const session = true;
    if (!session) {
      return <Redirect href={"/sign-up"}/>
    }
    return <Redirect href={"/(user)"}/>
  };
  
  export default index;