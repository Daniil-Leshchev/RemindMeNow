import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { parseICS } from '@/modeus/parser-modeus';
import { useInsertTask } from '@/api/insert';
import { InsertTables } from '@/lib/helperTypes';
import { supabase } from '@/lib/supabase';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import Text from "@/components/StyledText";
import { Link, Stack } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export type ScheduleData = {
  start: string | null,
  end: string | null,
  location: string | null,
  title: string | null
};

export default function ScheduleScreen() {
  const { mutate: insertTask } = useInsertTask();
  const [errors, setErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { profile } = useAuth();

  const addScheduleItem = async (item: ScheduleData) => {
    if (!profile)
      return;
    
    if (!item.title || !item.start || !item.end)
      return;

    const { data: duplicates } = await
      supabase
        .from('tasks')
        .select('*')
        .eq('title', item.title)
        .eq('startDate', item.start)
        .eq('user_id', profile.id);

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
        setErrors(`${error.message}`);
      }
    })
  }

  const uploadSchedule = async () => {
    setErrors('');
    let pickerResult = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
    if (pickerResult.canceled) {
      setErrors('Файл не выбран');
      return;
    }

    let fileUri = pickerResult.assets[0].uri;
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri);
      await FileSystem.deleteAsync(fileUri);

      const check = /^.*\.ics$/.test(fileUri);
      if (!check) {
        setErrors('Выберите файл формата .ics');
        return;
      }

      for (let item of parseICS(fileString))
        addScheduleItem(item);

      setSuccessMessage('Расписание успешно добавлено!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
    
    catch (error: unknown) {
      setErrors(`${error}`);
      return;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={styles.container}>
        <Link href='/schedule/autoImport' asChild>
          <Button
            text={'Синхронизировать расписание'}
            fontSize={20}
            fontColor='#fff'
            style={styles.syncButton}
          />
        </Link>

        <Button
          text={'Прикрепить файл .ics из Modeus'}
          fontSize={20}
          fontColor='#fff'
          onPress={uploadSchedule}
          style={styles.button}
        />
        <Text style={[styles.error, errors ? { display: 'flex' } : { display: 'none' }]}>{ errors }</Text>
        <Text style={[styles.success, successMessage ? { display: 'flex' } : { display: 'none' }]}>{ successMessage }</Text>
      </View>
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

  syncButton: {
    paddingHorizontal: 20,
  }
})