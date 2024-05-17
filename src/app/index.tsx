import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import React from 'react';
import { ActivityIndicator } from "react-native";
const index = () => {
  const { session, loading } = useAuth();
  if (loading) {
    return <ActivityIndicator/>
  }

  if (!session) {
    return <Redirect href={"/sign-in"}/>
  }
  return <Redirect href={"/(user)"}/>
};
  
export default index;