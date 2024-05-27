import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Text from '@components/StyledText';
import { Stack, router } from "expo-router";
import { Image } from 'expo-image';

const colors = {
  header: '#797979',
  item: '#F3F3F3',
  text: '#232323'
}

export default function NotificationSound() {
  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.headerContainer}>
          <Image
            source={require('@assets/icons/settings/navigation/back.svg')}
            style={{ width: 7, height: 14 }}
          />
          <Text style={styles.header}>Звук уведомления</Text>
        </Pressable>
        <View style={styles.settingsContainer}>
          <View style={styles.item}>
            <Image
              source={require('@assets/icons/task/standard.svg')}
              style={{ width: 28, height: 28 }}
            />
            <Text style={styles.text}>задача</Text>
          </View>

          <View style={styles.item}>
            <Image
              source={require('@assets/icons/task/prior.svg')}
              style={{ width: 28, height: 28 }}
            />
            <Text style={styles.text}>важное</Text>
          </View>

          <View style={styles.item}>
            <Image
              source={require('@assets/icons/task/event.svg')}
              style={{ width: 28, height: 28 }}
            />
            <Text style={styles.text}>событие</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    marginTop: 120
  },

  header: {
    fontFamily: 'Inter-Medium',
    fontSize: 22,
    color: colors.header
  },

  headerContainer: {
    marginLeft: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 40
  },

  settingsContainer: {
    paddingHorizontal: 27,
    gap: 14
  },

  item: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.item,
    paddingVertical: 14,
    paddingLeft: 16
  },

  text: {
    fontSize: 18,
    color: colors.text
  }
})