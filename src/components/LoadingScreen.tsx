import { LinearGradient } from "expo-linear-gradient"
import React from "react";
import { gradientColors } from "@/app/(user)";
import { ActivityIndicator, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={gradientColors}
    >
      <ActivityIndicator
        color={'#999999'}
        size={'large'}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LoadingScreen;