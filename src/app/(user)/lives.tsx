import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from "@/components/StyledText";
import { LinearGradient } from "expo-linear-gradient"
import { Image } from 'expo-image';

const gradientColors = ['#C0CEFF', '#6D7EBB']

const colors = {
  text: '#0A0864',
}

export default function LivesScreen() {
  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
    >
      <Image
        source={require('@assets/icons/motivationSystem/bigHeart.svg')}
        style={styles.heartIcon}
      />

      <Text style={styles.count}>Осталось 4 жизни</Text>

      <View style={styles.description}>
        <Text style={[styles.paragraph1, styles.descriptionText]}>
          Когда все жизни закончатся, 
          количество звёзд опустится на 
          начальный уровень  
        </Text>

        <Text style={styles.descriptionText}>
          Ежедневно выполняй задачи на день 
          и повышай количество звезд и жизней 
        </Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 220,
    alignItems: 'center',
  },

  heartIcon: {
    width: 167,
    height: 146,
    marginBottom: 36,
    shadowColor: '#9598BE',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 10
  },

  count: {
    fontSize: 32,
    color: '#000',
    marginBottom: 160
  },

  description: {
    alignItems: 'center',
    gap: 24,
    paddingVertical: 24,
    paddingHorizontal: 30,
    borderTopColor: colors.text,
    borderBottomColor: colors.text,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginHorizontal: 20
  },

  descriptionText: {
    color: colors.text,
    fontSize: 18,
    textAlign: 'center',
  },

  paragraph1: {
    maxWidth: 270
  }
})