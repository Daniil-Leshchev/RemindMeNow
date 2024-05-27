import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Text from '@components/StyledText';
import { Stack, router } from "expo-router";
import { Image } from 'expo-image';

const colors = {
  header: '#797979',
  text: '#232323'
}

export default function MoreAboutStars() {
  const [isOn, setIsOn] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.headerContainer}>
          <Image
            source={require('@assets/icons/settings/navigation/back.svg')}
            style={{ width: 7, height: 14 }}
          />
          <Text style={styles.header}>Подробнее о жизнях</Text>
        </Pressable>

        <View style={styles.settingsContainer}>
          <Image
            source={require('@assets/icons/settings/moreAboutStars/star.svg')}
            style={{ width: 83, height: 81, marginBottom: 16 }}
          />
          <Text style={styles.text}>
            Система жизней и звёзд в приложении
            представляет собой уникальный способ
            мотивации и контроля за продуктивностью.
          </Text>

          <Text style={styles.text}>
            Звёзды, в свою очередь, являются наградой.
          </Text>

          <Text style={styles.text}>
            За каждую выполненную задачу в день
            пользователь получает 1 звезду. Чем больше звёзд, тем выше уровень. 
            Каждый новый уровень открывает доступ к новому дизайну приложения.
          </Text>

          <Text style={styles.text}>
            Будьте внимательны к уровню звёзд и 
            жизней в приложении, чтобы добиться
            максимальных результатов в Вашей повсе-
            дневной деятельности.
          </Text>

          <View style={styles.toggleContainer}>
            <Text style={[styles.text, { display: isOn ? 'flex' : 'none' }]}>Что делать, если такая система не нужна?</Text>
            <Pressable onPress={() => setIsOn(!isOn)} style={[styles.toggleButton, isOn ? styles.turnOff : styles.turnOn]}>
              <Text style={[styles.text, { fontSize: 16 }]}>
                { isOn ? 'Отключить систему жизней и звёзд' : 'Включить систему жизней и звёзд'}
              </Text>
            </Pressable>
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
    flex: 1,
    paddingHorizontal: 26,
    gap: 15
  },

  text: {
    color: colors.text,
    lineHeight: 22,
    fontSize: 16
  },

  toggleContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    alignSelf: 'center'
  },

  toggleButton: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginTop: 15,
    borderRadius: 10,
    width: 336,
  },

  turnOn: {
    backgroundColor: '#82E186'
  },

  turnOff: {
    backgroundColor: '#BBBBBB'
  }
})