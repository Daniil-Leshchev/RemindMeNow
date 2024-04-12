import { Redirect } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function MainScreen() {
  return <Redirect href={'/'}/>
}