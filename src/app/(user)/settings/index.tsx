import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from "@/components/StyledText";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.dummyText}>Settings Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dummyText: {
    fontSize: 24,
  }
})