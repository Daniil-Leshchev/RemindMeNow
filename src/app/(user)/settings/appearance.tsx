import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Text from '@components/StyledText';
import { Stack, router } from "expo-router";
import { Image } from 'expo-image';
import { RadioButton } from 'react-native-radio-buttons-group';
import { LinearGradient } from "expo-linear-gradient";

const colors = {
  header: '#797979',
  activeLabel: '#484848',
  label: '#838383'
}

export default function Appearance() {
  const [theme, setTheme] = useState<string>('blue');
  const availableColors = ['blue'];
  const isSelected = (id: string) => {
    return id === theme;
  }

  const handleChangeTheme = (color: string) => {
    if ((availableColors.includes(color)))
      setTheme(color);
    return;
  }

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.headerContainer}>
          <Image
            source={require('@assets/icons/settings/navigation/back.svg')}
            style={{ width: 7, height: 14 }}
          />
          <Text style={styles.header}>Внешний вид</Text>
        </Pressable>

        <View style={styles.settingsContainer}>
          <Pressable style={styles.item} onPress={() => handleChangeTheme('blue')}>
            <LinearGradient
              colors={['#9FA1E3', '#19287A']}
              style={styles.gradientBlock}>
                <View
                  style={[styles.overlay,
                  { display: availableColors.includes('blue') ? 'none' : 'flex' }]}>
                    <Image
                      source={require('@assets/icons/settings/appearance/lock.svg')}
                      style={{ width: 32, height: 32 }}
                    />
                </View>
            </LinearGradient>
            <RadioButton
              id="1"
              onPress={() => setTheme('blue')}
              selected={isSelected('blue')}
              label="выбрать дизайн"
              labelStyle={isSelected('blue') ? styles.activeLabel : styles.label}
              size={14}
              disabled={!availableColors.includes('blue')}
            />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleChangeTheme('green')}>
            <LinearGradient
              colors={['#A5FFD3', '#65D7A1', '#349365', '#2B6C4D']}
              style={styles.gradientBlock}>
                <View
                  style={[styles.overlay,
                  { display: availableColors.includes('green') ? 'none' : 'flex' }]}>
                    <Image
                      source={require('@assets/icons/settings/appearance/lock.svg')}
                      style={{ width: 32, height: 32 }}
                    />
                </View>
            </LinearGradient>
            <RadioButton
              id="2"
              onPress={() => setTheme('green')}
              selected={isSelected('green')}
              label="выбрать дизайн"
              labelStyle={[isSelected('green') ? styles.activeLabel : styles.label]}
              size={14}
              disabled={!availableColors.includes('green')}
            />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleChangeTheme('orange')}>
            
            <LinearGradient
              colors={['#FED689', '#E7AA59', '#C66A15', '#CC520E']}
              style={styles.gradientBlock}>
                <View
                  style={[styles.overlay,
                  { display: availableColors.includes('orange') ? 'none' : 'flex' }]}>
                    <Image
                      source={require('@assets/icons/settings/appearance/lock.svg')}
                      style={{ width: 32, height: 32 }}
                    />
                </View>
            </LinearGradient>
            <RadioButton
              id="3"
              onPress={() => setTheme('orange')}
              selected={isSelected('orange')}
              label="выбрать дизайн"
              labelStyle={[isSelected('orange') ? styles.activeLabel : styles.label]}
              size={14}
              disabled={!availableColors.includes('orange')}
            />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleChangeTheme('pink')}>
            <LinearGradient
              colors={['#E8A3BC', '#9F306B', '#632279']}
              style={styles.gradientBlock}>
                <View
                  style={[styles.overlay,
                  { display: availableColors.includes('pink') ? 'none' : 'flex' }]}>
                    <Image
                      source={require('@assets/icons/settings/appearance/lock.svg')}
                      style={{ width: 32, height: 32 }}
                    />
                </View>
            </LinearGradient>
            <RadioButton
              id="4"
              onPress={() => setTheme('pink')}
              selected={isSelected('pink')}
              label="выбрать дизайн"
              labelStyle={[isSelected('pink') ? styles.activeLabel : styles.label]}
              size={14}
              disabled={!availableColors.includes('pink')}
            />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleChangeTheme('violet')}>
            <LinearGradient
              colors={['#EB9CFF', '#A760D2', '#553183', '#4A2D6E']}
              style={styles.gradientBlock}>
                <View
                  style={[styles.overlay,
                  { display: availableColors.includes('violet') ? 'none' : 'flex' }]}>
                    <Image
                      source={require('@assets/icons/settings/appearance/lock.svg')}
                      style={{ width: 32, height: 32 }}
                    />
                </View>
            </LinearGradient>
            <RadioButton
              id="5"
              onPress={() => setTheme('violet')}
              selected={isSelected('violet')}
              label="выбрать дизайн"
              labelStyle={[isSelected('violet') ? styles.activeLabel : styles.label]}
              size={14}
              disabled={!availableColors.includes('violet')}
            />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleChangeTheme('aqua')}>
            <LinearGradient
              colors={['#9CF9FF', '#60CBD2', '#317E83', '#2D626E']}
              style={styles.gradientBlock}>
                <View
                  style={[styles.overlay,
                  { display: availableColors.includes('aqua') ? 'none' : 'flex' }]}>
                    <Image
                      source={require('@assets/icons/settings/appearance/lock.svg')}
                      style={{ width: 32, height: 32 }}
                    />
                </View>
            </LinearGradient>
            <RadioButton
              id="6"
              onPress={() => setTheme('aqua')}
              selected={isSelected('aqua')}
              label="выбрать дизайн"
              labelStyle={[isSelected('aqua') ? styles.activeLabel : styles.label]}
              size={14}
              disabled={!availableColors.includes('aqua')}
            />
          </Pressable>
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
    paddingHorizontal: 54,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    rowGap: 20,
    columnGap: 42,
  },

  label: {
    fontSize: 15,
    color: colors.label
  },

  activeLabel: {
    fontSize: 15,
    color: colors.activeLabel
  },

  item: {
    width: 120,
    alignItems: 'center'
  },

  gradientBlock: {
    width: 120,
    height: 140,
    borderRadius: 20,
    marginBottom: 10
  },

  overlay: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})