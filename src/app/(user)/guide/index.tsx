import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from "@/components/StyledText";
import { Link, Stack } from 'expo-router';
import { Image } from 'expo-image';

const colors = {
  navigationItem: '#F3F3F3',
  text: '#000',
  description: '#6C6C6C'
}

export default function GuideScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={styles.navigation}>
        <Link href={'/guide/createTask'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/guide/navigation/blue.svg')}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.text}>Как добавить задачу</Text>
          </Pressable>
        </Link>

        <Link href={'/guide/completeTask'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/guide/navigation/yellow.svg')}
              style={{ width: 40, height: 40 }}
            />
            <View>
              <Text style={styles.text}>Свайпы</Text>
              <Text style={styles.description}>Как сделать задачу выполненной</Text>
            </View>
          </Pressable>
        </Link>

        <Link href={'/guide/postponeTask'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/guide/navigation/green.svg')}
              style={{ width: 40, height: 40 }}
            />
            <View>
              <Text style={styles.text}>Свайпы</Text>
              <Text style={styles.description}>Как перенести задачу</Text>
            </View>
          </Pressable>
        </Link>

        <Link href={'/guide/deleteTask'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/guide/navigation/red.svg')}
              style={{ width: 40, height: 40 }}
            />
            <View>
              <Text style={styles.text}>Свайпы</Text>
              <Text style={styles.description}>Как удалить задачу</Text>
            </View>
          </Pressable>
        </Link>

        <Link href={'/'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/guide/navigation/violet.svg')}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.text}>Как изменить фон</Text>
          </Pressable>
        </Link>

        <Link href={'/'} asChild>
          <Pressable style={styles.navigationItem}>
            <Image
              source={require('@assets/icons/guide/navigation/aqua.svg')}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.text}>Как изменить уведомления</Text>
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
    paddingHorizontal: 35,
    gap: 32
  },

  navigationItem: {
    flexDirection: 'row',
    gap: 9,
    paddingVertical: 20,
    paddingLeft: 18,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.navigationItem,
  },

  text: {
    color: colors.text,
    fontSize: 18,
  },

  description: {
    color: colors.description,
    fontSize: 13
  }
})