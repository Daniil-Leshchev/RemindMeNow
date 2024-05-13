import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import React from 'react';
import { Stack } from 'expo-router';
import CurrentDayProvider from '@/providers/CurrentDayProvider';
import AuthProvider from '@/providers/AuthProvider';

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

function RootLayoutNav() {
  return (
    <AuthProvider>
      <CurrentDayProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{headerShown: false}}/>
          <Stack.Screen name="(user)" options={{headerShown: false}}/>
        </Stack>
      </CurrentDayProvider>
    </AuthProvider>
  );
}