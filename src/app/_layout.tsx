import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { DrawerItem, createDrawerNavigator, useDrawerProgress } from "@react-navigation/drawer";
import MainScreen from './(user)';
import GuideScreen from './(guide)';
import React = require('react');
import { Text } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Inter": require('assets/fonts/InterDisplay-Regular.ttf'),
    "Inter-Medium": require('assets/fonts/InterDisplay-Medium.ttf'),
    "Inter-Light": require('assets/fonts/InterDisplay-Light.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const menuColor = '#C0CEFF';
const activeItemColor = '#4183E5';

const Drawer = createDrawerNavigator();
function RootLayoutNav() {
  //TODO: header right чтобы добавить звезды и жизни
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
        name="(user)"
        component={MainScreen}
        options={{headerTitle: '', title: 'Главный экран'}}/>

      <Drawer.Screen
        name="(guide)/index"
        component={GuideScreen}
        options={{headerTitle: 'Гайд по приложению', title: 'Гайд по приложению'}}/>
    </Drawer.Navigator>
  );
}