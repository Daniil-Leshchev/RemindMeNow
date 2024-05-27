import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from "@/components/StyledText";
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';

const colors = {
  text: '#6C6C6C',
  header: '#7412B0'
}

export default function CompleteTask() {
  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.headerContainer}>
          <Image
            source={require('@assets/icons/settings/navigation/back.svg')}
            style={[{ width: 7, height: 14}, styles.back]}
          />
        <Text style={styles.header}>Свайпы</Text>
        </Pressable>
        <Text style={styles.text}>Как сделать задачу выполненной</Text>
        
        <Image
          source={require('@assets/guide-gifs/complete.gif')}
          style={{ width: 240, height: 240 * 2.17 }}
        />

        <Text style={styles.text}>
          В блоке выбранного дня передвиньте задачу 
          влево, затем нажмите на галочку
        </Text>

        <Text style={styles.text}>
          Именно выполненная задача принесет Вам 1 звезду,
          если Вы подключили систему жизней и звёзд
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
  },

  back: {
    position: 'absolute',
    bottom: 5,
    left: -20,
  }
})