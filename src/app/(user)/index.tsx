import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from "@/components/StyledText";
import { LinearGradient } from 'expo-linear-gradient';
import Drawer from 'expo-router/drawer';
import Button from '@/components/Button';
const gradientColors = ['#9FA1E3', '#19287A']
export default function MainScreen() {
  return (
      <LinearGradient
        style={styles.gradient}
        colors={gradientColors}
      >
        <Drawer.Screen options={{headerShown: false}}/>
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  }
})