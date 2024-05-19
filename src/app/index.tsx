import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import React from 'react';
const index = () => {
  const { session, loading } = useAuth();
  if (loading)
    return <LoadingScreen/>

  if (!session)
    return <Redirect href={"/sign-in"}/>
  return <Redirect href={"/(user)"}/>
};
  
export default index;