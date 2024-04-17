import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Text from "@/components/StyledText";
import { LinearGradient } from 'expo-linear-gradient';
import Drawer from 'expo-router/drawer';
import Button from '@/components/Button';
import { FontAwesome } from '@expo/vector-icons';
import * as Svg from 'react-native-svg';
const gradientColors = ['#9FA1E3', '#19287A']
export default function MainScreen() {
  return (
      <LinearGradient
        style={styles.gradient}
        colors={gradientColors}
      >
        <Drawer.Screen options={{
          headerTransparent: true,
          headerTintColor: '#000',
          drawerIcon: () =>
            // <FontAwesome
            //   name='home'
            //   size={32}
            //   color='#000'/>
            <Image 
              source={require('@assets/menu-icons/home.svg')}
              style={{ width: 40, height: 40 }}
            />
        }}
    />
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  }
})