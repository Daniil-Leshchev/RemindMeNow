import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from "@/components/StyledText";
import { Link, Stack } from 'expo-router';
import { Image } from 'expo-image';

const colors = {
  navigationItem: '#F3F3F3'
}

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
          headerShown: false
        }}
      />
      <View style={styles.navigation}>
        <Link href={'/settings/notificationSound'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/settings/navigation/bell.svg')}
              style={{ width: 18, height: 19 }}
            />
            <Text style={styles.text}>Звук уведомления</Text>
          </Pressable>
        </Link>

        <Link href={'/settings/sounds'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/settings/navigation/bell-plus.svg')}
              style={{ width: 16, height: 18 }}
            />
            <Text style={styles.text}>Звуки в приложении</Text>
          </Pressable>
        </Link>

        <Link href={'/settings/icon'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/settings/navigation/icon-number.svg')}
              style={{ width: 16, height: 16 }}
            />
            <Text style={styles.text}>Число на иконке</Text>
          </Pressable>
        </Link>

        <Link href={'/settings/appearance'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/settings/navigation/appearance.svg')}
              style={{ width: 18, height: 18 }}
            />
            <Text style={styles.text}>Внешний вид</Text>
          </Pressable>
        </Link>

        <Link href={'/guide'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/settings/navigation/loupe.svg')}
              style={{ width: 18, height: 18 }}
            />
            <Text style={styles.text}>Гайд по приложению</Text>
          </Pressable>
        </Link>

        <Link href={'/settings/moreAboutLives'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/settings/navigation/heart.svg')}
              style={{ width: 18, height: 16 }}
            />
            <Text style={styles.text}>Подробнее о жизнях</Text>
          </Pressable>
        </Link>

        <Link href={'/settings/moreAboutStars'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/settings/navigation/star.svg')}
              style={{ width: 20, height: 19 }}
            />
            <Text style={styles.text}>Подробнее о звездах</Text>
          </Pressable>
        </Link>

        <Link href={'/schedule'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/settings/navigation/schedule.svg')}
              style={{ width: 16, height: 18 }}
            />
            <Text style={styles.text}>Привязать расписание</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  navigation: {
    marginTop: 140,
    paddingHorizontal: 28,
    gap: 15
  },

  navigationItem: {
    backgroundColor: colors.navigationItem,
    paddingVertical: 8,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    gap: 18
  },

  text: {
    fontSize: 18,
    color: '#000'
  }
})