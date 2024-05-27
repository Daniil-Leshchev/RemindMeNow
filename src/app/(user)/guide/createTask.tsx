import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from "@/components/StyledText";
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';

const colors = {
  text: '#6C6C6C',
  header: '#7412B0'
}

export default function CreateTask() {
  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.headerContainer}>
          <Image
            source={require('@assets/icons/settings/navigation/back.svg')}
            style={{ width: 7, height: 14 }}
          />
        <Text style={styles.header}>Как добавить задачу</Text>
        </Pressable>
        <Text style={styles.text}>через кнопку внизу экрана</Text>
        
        <Image
          source={require('@assets/guide-gifs/create-task.gif')}
          style={{ width: 240, height: 240 * 2.17 }}
        />

        <Text style={styles.text}>
          Чтобы добавить задачу введите название 
          внизу экрана и/или нажмите на кнопку “+” 
        </Text>

        <Text style={styles.text}>
          Затем выберите тип задачи, начало и конец, 
          повтор и напоминание, также можно добавить
          дополнительный текст и вложение
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },

  container: {
    flex: 1,
    marginTop: 120,
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 14
  },

  text: {
    color: colors.text,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18
  },

  header: {
    color: colors.header,
    fontSize: 18
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  }
})