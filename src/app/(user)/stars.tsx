import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from "@/components/StyledText";
import { LinearGradient } from "expo-linear-gradient"
import { Image } from 'expo-image';
import Button from '@components/Button';

const gradientColors = ['#C0CEFF', '#6D7EBB']

const colors = {
  text: '#0D0C38',
  unlockText: '#C0CEFF',
  unlockButtonBackground: '#8A9DCDB5',
  moreInfo: '#8a9dcd'
}

export default function StarsScreen() {
  const [showMore, setShowMore] = useState(false);

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
    >
      <Image
        source={require('@assets/icons/motivationSystem/bigStar.svg')}
        style={styles.starIcon}
      />

      <View style={styles.currentLevelContainer}>
        <Text style={styles.levelName}>Ученик</Text>
        <Text style={styles.count}>57 звёзд</Text>
      </View>

      <View style={styles.nextLevelContainer}>
        <Text style={styles.nextLevel}>Следующий уровень: студент</Text>
        <View style={styles.newFeature}>
          <Image
            source={require('@assets/icons/motivationSystem/unlock.svg')}
            style={{ width: 16, height: 16 }}
          />
          <Text style={styles.nextLevel}>возможность добавить свой дизайн</Text>
        </View>
      </View>

      <Button
        text='Разблокировать уровень'
        fontSize={20}
        fontColor={colors.unlockText}
        style={styles.unlockLevelButton}
      />

      <View style={[styles.moreInfo, { display: showMore ? 'flex' : 'none' }]}>
        <Text style={styles.moreInfoHeader}>1 выполненное задание = 1 звезда</Text>
        <Text style={styles.moreInfoLevel}>ученик 0 - 100 звёзд</Text>
        <Text style={styles.moreInfoLevel}> студент 100 - 250 звёзд</Text>
        <Text style={styles.moreInfoLevel}> профессор 250 - 500 звёзд </Text>
        <Text style={styles.moreInfoLevel}>гений 500 - 800 звёзд</Text>
        <Text style={styles.moreInfoLevel}>мудрец 800 - 1200 звёзд</Text>
        <Text style={styles.moreInfoLevel}>магистр 1200  - 2000 звёзд</Text>
        <Text style={styles.moreInfoLevel}>высший разум {'>'}2000 звёзд</Text>
      </View>

      <Pressable onPress={() => setShowMore(!showMore)}>
        <Text style={styles.more}>подробнее о звездах</Text>
      </Pressable>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 220,
    alignItems: 'center',
  },

  starIcon: {
    width: 167,
    height: 163,
    marginBottom: 40,
    shadowColor: '#9296D9',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 10
  },

  currentLevelContainer: {
    alignItems: 'center',
    marginBottom: 140,
  },

  levelName: {
    fontSize: 32,
    marginBottom: 8,
    color: colors.text
  },

  count: {
    fontSize: 26,
    color: colors.text
  },

  nextLevelContainer: {
    alignItems: 'center',
    marginBottom: 12
  },

  nextLevel: {
    color: colors.text,
    fontSize: 15
  },

  newFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },

  unlockLevelButton: {
    paddingVertical: 24,
    paddingHorizontal: 36,
    marginTop: 0,
    marginBottom: 20,
    width: 320,
    backgroundColor: colors.unlockButtonBackground,
    shadowColor: '#5B64AE4D',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 10
  },

  more: {
    fontSize: 16,
    color: colors.text
  },

  moreInfo: {
    minWidth: 340,
    minHeight: 240,
    backgroundColor: colors.moreInfo,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    position: 'absolute',
    bottom: 82,
    shadowColor: '#5B64AE4D',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 10,
    gap: 6
  },

  moreInfoHeader: {
    marginBottom: 10,
    color: colors.text,
    fontSize: 18,
  },

  moreInfoLevel: {
    color: colors.text,
    fontSize: 18,
  }
})