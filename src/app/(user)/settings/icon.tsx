import React, { useState, useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Text from '@components/StyledText';
import { Stack, router } from "expo-router";
import { Image } from 'expo-image';
import RadioGroup from 'react-native-radio-buttons-group';

const colors = {
  header: '#797979',
  item: '#F3F3F3',
  text: '#232323'
}

export default function Icon() {
  const [iconNumber, setIconNumber] = useState('2');

  const radioButtons = useMemo(() => ([
    {
      id: '1',
      label: 'Задачи на сегодня',
      value: 'today',
      containerStyle: {
        backgroundColor: '#F3F3F3',
        paddingVertical: 18,
        paddingLeft: 17,
        width: '100%',
        borderRadius: 10
      }
    },
    {
      id: '2',
      label: 'Все задачи',
      value: 'all',
      containerStyle: {
        backgroundColor: '#F3F3F3',
        paddingVertical: 18,
        paddingLeft: 17,
        width: '100%',
        borderRadius: 10
      }
    },
    {
      id: '3',
      label: 'Выключено',
      value: 'off',
      containerStyle: {
        backgroundColor: '#F3F3F3',
        paddingVertical: 18,
        paddingLeft: 17,
        width: '100%',
        borderRadius: 10
      }
    }
  ]), []);

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.headerContainer}>
          <Image
            source={require('@assets/icons/settings/navigation/back.svg')}
            style={{ width: 7, height: 14 }}
          />
          <Text style={styles.header}>Число на иконке</Text>
        </Pressable>

        <View style={styles.settingsContainer}>
          <Image
            source={require('@assets/icons/settings/icon/icon-with-number.svg')}
            style={{ width: 100, height: 102, marginBottom: 50 }}
          />

          <RadioGroup
            radioButtons={radioButtons}
            onPress={setIconNumber}
            selectedId={iconNumber}
            containerStyle={styles.buttonsContainer}
            labelStyle={styles.label}
          />
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
    marginTop: 100
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
    alignItems: 'center',
    paddingHorizontal: 27,
    gap: 14
  },

  buttonsContainer: {
    width: '100%',
    gap: 18,
    borderRadius: 10,
  },

  label: {
    fontSize: 16,
    color: colors.text
  }
})