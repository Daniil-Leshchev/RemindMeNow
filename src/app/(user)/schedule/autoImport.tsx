import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { parseICS } from '@/modeus/parser-modeus';
import { useInsertTask } from '@/api/insert';
import { InsertTables } from '@/lib/helperTypes';
import { supabase } from '@/lib/supabase';
import * as FileSystem from 'expo-file-system';
import Text from "@/components/StyledText";
import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';
import { ScheduleData } from '@/app/(user)/schedule/main';

const login = 'Daniil.Leshchev@at.urfu.ru';
const password = 'Dan220505';

const loginScript = `
  document.querySelector('#userNameInput').value = '${login}';
  document.querySelector('#passwordInput').value = '${password}';
  document.querySelector('#submitButton').click();
  document.querySelector('#submitButton').click();
  true;
`;

export default function AutoImportScreen() {
  const { mutate: insertTask } = useInsertTask();
  const [scheduleLink, setScheduleLink] = useState('');
  const webviewRef = useRef<WebView>(null);

  const addScheduleItem = async (item: ScheduleData) => {
    if (!item.title || !item.start || !item.end)
      return;
    const { data: duplicates } = await
      supabase
        .from('tasks')
        .select('*')
        .eq('title', item.title)
        .eq('startDate', item.start);
    if (duplicates?.length != 0)
      return;

    const task: InsertTables<'tasks'> = {
      title: item.title,
      type: 'standard',
      isAllDay: false,
      startDate: item.start,
      endDate: item.end,
      repeat: 'never',
      reminder: 'no',
      attachment: null,
      notes: '',
      isSchedule: true
    }

    insertTask(task, {
      onError(error: Error) {
        console.error(`${error.message}`);
      }
    })
  }

  const uploadSchedule = async () => {
    // for (let item of parseICS(fileString))
    //   addScheduleItem(item);
  }

  const handleWebViewNavigationStateChange = (newNavState: any) => {
    const { url } = newNavState;

    // если сейчас первая перезагрузка страницы, то нужно сделать редирект на /schedule
    if (!url.includes('schedule')) {
      const newURL = 'https://istudent.urfu.ru/s/schedule';
      const redirectTo = 'window.location = "' + newURL + '"';
      webviewRef.current?.injectJavaScript(redirectTo);
    }

    // после перехода на /schedule необходимо найти элемент и доставить ссылку на расписание обратно в код
    else {
      webviewRef.current?.injectJavaScript(
        `
        setTimeout(() => {
          const href = document.querySelector('.ical').href;
          window.ReactNativeWebView.postMessage(href);
        }, 1000);
        `
      )
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }}/>

      <View style={styles.container}>
        <Text>Some random text</Text>
      </View>

      {/* <WebView
        ref={webviewRef}
        style={styles.webview}
        injectedJavaScript={loginScript}
        source={{ uri: 'https://istudent.urfu.ru/' }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        onMessage={(event) => {
          console.log(event.nativeEvent.data)
          setScheduleLink(event.nativeEvent.data)
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  button: {
    shadowColor: '#2F366C4D',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 10,
  },

  error: {
    marginTop: -8,
    fontSize: 16,
    color: '#e74c3c'
  },

  success: {
    marginTop: -8,
    fontSize: 16,
    color: '#2ecc71'
  },

  webview: {
    display: 'none'
  }
})