import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from "@/components/StyledText";
import { LinearGradient } from 'expo-linear-gradient';
const gradientColors = ['#9FA1E3', '#19287A'];
export default function MainScreen() {
  return (
      <LinearGradient
        style={styles.gradient}
        colors={gradientColors}>
            <Text style={styles.dummyText}>
              Main Screen
            </Text>
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dummyText: {
    fontSize: 24,
  }
})