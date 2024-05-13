import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Image } from 'expo-image';
import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function MenuStack() {
  const menuColor = '#C0CEFF';
  const activeItemColor = '#4183E5';
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/'}/>
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Drawer screenOptions={{
        drawerActiveTintColor: activeItemColor,
        drawerActiveBackgroundColor: menuColor,
        drawerInactiveTintColor: '#000',
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: menuColor,
          borderTopEndRadius: 30,
          borderBottomEndRadius: 30,
          paddingTop: 32,
          height: 720,
          width: 340,
          alignSelf: 'center',
          top: 'auto',
          bottom: 'auto',
        },
        drawerLabelStyle: {
          fontSize: 20,
          fontFamily: 'Inter',
          marginLeft: -16,
        },
        headerTitleAlign: 'left',
        headerTransparent: true,
        headerTintColor: '#000',
        }}
      >
        <Drawer.Screen 
          name="index"
          options={{
            drawerLabel: 'Главный экран',
            title: '',
            drawerIcon: () =>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('@assets/icons/menu/home.svg')}
                  style={{ width: 35, height: 35 }}/>
              </View>
            }}
          />

        <Drawer.Screen
          name="settings/index"
          options={{
            drawerLabel: 'Настройки', 
            title: 'Настройки', 
            headerTitleStyle: {
              fontFamily: 'Inter-Medium',
              fontSize: 24,
              color: '#797979'
            },
            drawerIcon: () =>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('@assets/icons/menu/settings.svg')}
                  style={{ width: 32, height: 35 }}/>
              </View>
          }}
        />

        <Drawer.Screen
          name="guide/index"
          options={{
            drawerLabel: 'Гайд по приложению', 
            title: 'Гайд по приложению', 
            headerTitleStyle: {
              fontFamily: 'Inter-Medium',
              fontSize: 24,
              color: '#797979'
            },
          
            drawerIcon: () =>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('@assets/icons/menu/question.svg')}
                  style={{ width: 15, height: 26 }}/>
              </View>           
          }}
        />

        <Drawer.Screen
          name="stars/index"
          options={{
            drawerLabel: 'Мои звезды',
            title: '',
            drawerIcon: () =>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('@assets/icons/menu/star.svg')}
                  style={{ width: 33, height: 33 }}/>
              </View> 
          }}
        />

        <Drawer.Screen
          name="lives/index"
          options={{
            drawerLabel: 'Мои жизни', 
            title: '',
            drawerIcon: () =>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('@assets/icons/menu/heart.svg')}
                  style={{ width: 32, height: 30 }}/>
              </View>      
          }}
        />

        <Drawer.Screen
          name="schedule/index"
          options={{
            drawerLabel: 'Привязать расписание',
            title: '',
            drawerIcon: () =>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('@assets/icons/menu/calendar-modeus.svg')}
                  style={{ width: 40, height: 40 }}/>
              </View>
          }}
        />

        <Drawer.Screen
          name="sign-out/index"
          options={{
            drawerLabel: 'Выйти', 
            title: '',
            drawerIcon: () =>
              <View style={styles.iconContainer}>
                <Image
                  source={require('@assets/icons/menu/sign-out.svg')}
                  style={{ width: 40, height: 40 }}/>
              </View>
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  }
})