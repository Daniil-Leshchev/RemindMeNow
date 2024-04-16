import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from '@/app/(user)/index';
import GuideScreen from '@/app/(user)/guide';

export default function MenuStack() {
  const menuColor = '#C0CEFF';
  const activeItemColor = '#4183E5';
  const Drawer = createDrawerNavigator();
  
  return (
    <Drawer.Navigator screenOptions={{
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
        paddingLeft: 24,
        alignSelf: 'center',
        position: 'absolute',
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
      }
    }}>
      <Drawer.Screen 
        name="Main"
        component={MainScreen}
        options={{headerTitle: '', title: 'Главный экран'}}/>

      <Drawer.Screen
        name="(guide)/index"
        component={GuideScreen}
        options={{headerTitle: 'Гайд по приложению', title: 'Гайд по приложению'}}/>
    </Drawer.Navigator>
  )
}