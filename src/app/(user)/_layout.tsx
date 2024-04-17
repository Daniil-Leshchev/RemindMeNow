import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function MenuStack() {
  const menuColor = '#C0CEFF';
  const activeItemColor = '#4183E5';
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Drawer screenOptions={{
        drawerActiveTintColor: activeItemColor,
        drawerActiveBackgroundColor: menuColor,
        drawerInactiveTintColor: '#000',
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: menuColor,
          borderEndColor: '#000',
          borderTopEndRadius: 30,
          borderBottomEndRadius: 30,
          height: 720,
          width: 340,
          alignSelf: 'center',
          top: 'auto',
          bottom: 'auto',
        },
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: 'transparent',
        },
        drawerLabelStyle: {
          fontSize: 22,
          fontFamily: 'Inter',
          // marginLeft: -12,
        },
      }}>
        <Drawer.Screen 
          name="index"
          options={{drawerLabel: 'Главный экран', title: ''}}/>

        <Drawer.Screen
          name="guide/index"
          options={{
            drawerLabel: 'Гайд по приложению', 
            title: 'Гайд по приложению', 
            headerTitleStyle: {
              fontFamily: 'Inter-Medium',
              fontSize: 24,
              color: '#797979'
            }
          }}/>
      </Drawer>
    </GestureHandlerRootView>
  )
}