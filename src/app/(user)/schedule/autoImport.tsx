import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Button from '@/components/Button';
import { parseICS } from '@/modeus/parser-istudent';
import { useInsertTask } from '@/api/insert';
import { InsertTables } from '@/lib/helperTypes';
import { supabase } from '@/lib/supabase';
import * as FileSystem from 'expo-file-system';
import Text from "@/components/StyledText";
import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';
import { ScheduleData } from '@/app/(user)/schedule/main';
import { useAuth } from '@/providers/AuthProvider';

export default function AutoImportScreen() {
  const [needToSetCredentials, setNeedToSetCredentials] = useState(false);
  const [isFetchingCredentials, setIsFetchingCredentials] = useState(false);
  const [urfuLogin, setUrfuLogin] = useState('');
  const [urfuPassword, setUrfuPassword] = useState('');
  const [isScheduleAdded, setIsScheduleAdded] = useState(false);

  const { profile } = useAuth();
  if (!profile)
    return;
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('urfu_login, urfu_password')
        .eq('id', profile.id);

      if (data && data.length > 0) {
        const { urfu_login, urfu_password } = data[0];
        if (!urfu_login || !urfu_password) {
          setNeedToSetCredentials(true);
          return;
        }
        setUrfuLogin(urfu_login);
        setUrfuPassword(urfu_password);
      }
    }

    fetchData();
  }, [isFetchingCredentials]);

  const loginScript = `
    setTimeout(() => {
      document.querySelector('#userNameInput').value = '${urfuLogin}';
      document.querySelector('#passwordInput').value = '${urfuPassword}';
      document.querySelector('#submitButton').click();
    }, 1000);
  `;

  const { mutate: insertTask } = useInsertTask();
  const webviewRef = useRef<WebView>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successSaveCredentials, setSuccessSaveCredentials] = useState(false);

  const saveUrfuCredentials = async () => {
    setIsFetchingCredentials(true);
    await supabase
      .from('profiles')
      .update({ urfu_login: email, urfu_password: password })
      .eq('id', profile?.id);
    setIsFetchingCredentials(false);
    setSuccessSaveCredentials(true);
  }

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


  const handleWebViewNavigationStateChange = (newNavState: any) => {
    if (needToSetCredentials)
      return;

    const { url } = newNavState;
    // если сейчас первая перезагрузка страницы, то нужно сделать редирект на /schedule
    if (!url.includes('schedule')) {
      setTimeout(() => {
        const newURL = 'https://istudent.urfu.ru/s/schedule';
        const redirectTo = 'window.location = "' + newURL + '"';
        webviewRef.current?.injectJavaScript(redirectTo);
      }, 1000);
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

  const downloadAndReadFile = async (url: string) => {
    try {
      const { uri } = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + 'schedule.txt'
      );

      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        const fileContent = await FileSystem.readAsStringAsync(uri);
        console.log(fileContent);
        for (let item of parseICS(fileContent))
          addScheduleItem(item);
        await FileSystem.deleteAsync(uri, { idempotent: true });
      }
    } 
    catch (error) {
      console.error('Ошибка при загрузке файла', error);
      return;
    }

    setIsScheduleAdded(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={styles.container}>
        <Text style={[needToSetCredentials ? { display: 'flex' } : { display: 'none' }, styles.header]}>Введите данные от аккаунта УрФУ</Text>
        <View style={needToSetCredentials ? { display: 'flex' } : { display: 'none' }}>
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor='#828282'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
          />

          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#828282'
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
            secureTextEntry
          />

          <Button
            text={isFetchingCredentials ? 'Сохранение...' : 'Сохранить данные'}
            fontSize={20}
            fontColor='#fff'
            style={styles.button}
            onPress={saveUrfuCredentials}
            disabled={isFetchingCredentials}
          />

          <Text style={[styles.successMessage, successSaveCredentials ? { display: 'flex' } : { display: 'none' }]}>
            Данные успешно сохранены
          </Text>
        </View>

        <Text style={[needToSetCredentials ? { display: 'none' } : { display: 'flex' }, styles.syncingText]}>
          {isScheduleAdded ? 'Расписание успешно загружено' : 'Загрузка расписания...'}
        </Text>
      </View>

      <WebView
        ref={webviewRef}
        style={styles.webview}
        injectedJavaScript={loginScript}
        source={{ uri: 'https://istudent.urfu.ru/student/login' }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        cacheEnabled={false}
        onMessage={(event) => {
          downloadAndReadFile(event.nativeEvent.data);
        }}
      />
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
    alignSelf: 'center'
  },

  webview: {
    display: 'none'
  },

  input: {
    color: '#828282',
    backgroundColor: '#EFEFEF',
    borderColor: '#D2D2D2',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: 335,
    paddingLeft: 12
  },

  header: {
    color: '#7412B0',
    fontSize: 22,
    fontFamily: 'Inter-Medium',
    marginBottom: 40,
  },

  successMessage: {
    fontSize: 16,
    color: '#2ecc71',
    alignSelf: 'center',
  },

  syncingText: {
    fontSize: 20,
  }
})