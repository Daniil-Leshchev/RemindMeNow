import { Redirect, Stack } from 'expo-router';
import React = require('react');

export default function AuthLayout() {
    const session = false;
    //protecting all the screens in auth
    //redirecting to main screen if signed in
    //only unauthenticated users are able to see sign in screens
    if (session) {
        return <Redirect href={'/'}/>
    }
    return <Stack/>
}