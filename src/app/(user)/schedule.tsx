import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Button from '@/components/Button';
import { parseICS } from '@/modeus/parser'
import { useInsertTask } from '@/api/insert';
import { InsertTables } from '@/lib/helperTypes';
import { supabase } from '@/lib/supabase';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export type ScheduleData = {
  start: string | null,
  end: string | null,
  location: string | null,
  title: string | null
};

export default function ScheduleScreen() {
  const { mutate: insertTask } = useInsertTask();
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
      notes: null
    }

    insertTask(task, {
      onError(error: Error) {
        console.warn(error.message);
      }
    })
  }

  const uploadSchedule = async () => {
    let pickerResult = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
    if (pickerResult.canceled) {
      Alert.alert('Ошибка при загрузке файла');
      return;
    }

    let fileUri = pickerResult.assets[0].uri;
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri);
        await FileSystem.deleteAsync(fileUri);

      const check = /^.*\.ics$/.test(fileUri);
      if (!check) {
        Alert.alert('Выберите файл формата .ics');
        return;
      }

      for (let item of parseICS(fileString))
        addScheduleItem(item);
    }
    
    catch (error: unknown) {
      Alert.alert(`${error}`)
    } 
  }

  return (
    <View style={styles.container}>
      <Button
        text='Прикрепить файл .ics'
        fontSize={22}
        fontColor='#fff'
        onPress={uploadSchedule}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    shadowColor: '#2F366C4D',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 10,
  }
})