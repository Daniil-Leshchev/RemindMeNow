import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from "@/components/StyledText";
import Button from "@/components/Button";
export default function StarsScreen() {
  return (
    <View style={styles.container}>
      <Button text='Выйти' onPress={() => console.warn('Signing out')}></Button>
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