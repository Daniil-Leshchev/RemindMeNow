import React, { useMemo, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Platform } from 'react-native';
import Text from "@/components/StyledText";
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import moment from 'moment';
import 'moment/locale/ru';
import Swiper from 'react-native-swiper';
import AddTaskButton from '@/components/AddTaskButton';
import BottomSheet from '@gorhom/bottom-sheet';
import AddTaskBottomSheet from '@components/AddTaskBottomSheet';
import DayTasksBottomSheet from '@/components/DayTasksBottomSheet';
import { useCurrentDay } from '@/providers/CurrentDayProvider';
import TaskItem from '@/components/TaskItem';
import LoadingScreen from '@/components/LoadingScreen';
import { useTodayTasks } from '@/api/select';
import { tasksSorting } from '@/components/DayTasksBottomSheet';

import { parseICS } from '@/modeus/parser'
import { scheduleString } from '@/modeus/scheduleString'
import { useInsertTask } from '@/api/insert';
import { InsertTables } from '@/lib/helperTypes';
import { supabase } from '@/lib/supabase';

export type ScheduleData = {
  start: string | null,
  end: string | null,
  location: string | null,
  title: string | null
};

const scheduleItems = parseICS(scheduleString);

export const gradientColors = ['#9FA1E3', '#19287A'];
const colors = {
  background: '#C0CEFF',
  shadow: '#2F366C4D',
  dayPressed: '#7380AD',
}

export default function MainScreen() {
  const swiper = useRef<Swiper>(null);
  const [period, setPeriod] = useState(0);
  const periodRange = 4;
  const periods = useMemo(() => {//кэширование полученного результата
    //при изменении period будет меняться, а если не меняется, то результат берем из кэша
    const start = moment().add(period, 'day').startOf('day');
    return [-periodRange, 0, periodRange].map(adj => {
      return Array.from({ length: periodRange }).map((_, index) => {
        const date = moment(start).add(adj + index, 'day');
        return {
          weekday: date.format('ddd'),
          date: date.toDate()
        };
      });
    });
  }, [period])

  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenBottomSheet = () => bottomSheetRef.current?.expand();
  const handleCloseBottomSheet = () => bottomSheetRef.current?.close();

  const dayBottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenDayBottomSheet = () => dayBottomSheetRef.current?.expand();
  const { setContextDay } = useCurrentDay();
  const chooseDay = (day: Date) => {
    const now = new Date();
    day.setHours(now.getHours());
    day.setMinutes(now.getMinutes());
    setContextDay(day);
    handleOpenDayBottomSheet();
    uploadSchedule();
  }
  
  const { data: tasks, error, isLoading } = useTodayTasks();
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

  const uploadSchedule = () => {
    for (let item of scheduleItems)
      addScheduleItem(item);
  }

  if (isLoading)
    return <LoadingScreen/>;

  if (error)
    return (
      <LinearGradient
        style={[styles.gradient, {
          justifyContent: 'center', 
          alignItems: 'center'
        }]}
        colors={gradientColors}>
        <Text style={styles.fetchingError}>Не удалось загрузить ваши задачи :(</Text>
      </LinearGradient>
    );

  return (
    <LinearGradient
      style={styles.gradient}
      colors={gradientColors}>
        <View style={styles.wrapper}>
          <Pressable
            onPress={() => chooseDay(new Date())}
            style={[styles.todayTasksContainer, styles.androidShadow]}>
            <FlatList
              ListHeaderComponent={
                <Text style={styles.todayTasksHeader}>Задачи на сегодня:</Text>
              }
              data={tasks?.sort(tasksSorting)}
              renderItem={({item}) => <TaskItem task={item} isTodayView={true}/>}
              contentContainerStyle={{
                gap: 22,
                paddingVertical: 16,
                paddingHorizontal: 14
              }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.noTasksForToday}>У вас нет задач на сегодня</Text>
              }
              ListHeaderComponentStyle={tasks?.length === 0 ? { display: 'none' } : { display: 'flex' }}
            />
          </Pressable>

          <View>
            <View style={styles.calendarBlock}>
              <Text style={styles.calendarHeader}>Календарь</Text>
              <Pressable style={[styles.calendarButton, styles.androidShadow]}>
                <View style={styles.monthContainer}>
                  <Text style={styles.month}>{moment().format('MMMM')}</Text>
                </View>
                <Image 
                  source={require('@assets/icons/mainScreen/calendar.svg')}
                  style={styles.calendarIcon}
                />
              </Pressable>
            </View>

            <Swiper
              index={1}
              ref={swiper}
              showsPagination={false}
              loop={false}
              horizontal={true}
              loadMinimal={true}
              removeClippedSubviews={true}
              onIndexChanged={ind => {
                if (ind == 1) {
                  return;
                }
                setTimeout(() => {
                  const newIndex = ind == 0 ? -periodRange : periodRange;
                  const newPeriod = period + newIndex;
                  setPeriod(newPeriod);
                  if (Platform.OS === 'ios') {
                    swiper.current?.scrollTo(1, false);
                  }
                  else {
                    swiper.current?.scrollTo(1, true);
                  }
                }, 1);
              }}>
              {periods.map((dates, index) => (
                <View key={index} style={styles.scrollableCalendar}>
                  {dates.map((item, dateIndex) => {
                    const isActive = item.date.toDateString() === moment().toDate().toDateString();
                    return (
                      <Pressable
                        key={dateIndex}
                        onPress={() => chooseDay(item.date)}>
                          <View
                            style={[
                              styles.dayItem,
                              styles.androidShadow,
                              isActive && {
                                backgroundColor: colors.dayPressed
                              }
                            ]}>
                              <Text
                                style={styles.weekDayLabel}>
                                  {item.weekday}
                              </Text>
                              <Text style={styles.dayItemDate}>
                                {item.date.getDate()}
                              </Text>
                          </View>
                      </Pressable>
                    )
                  })}
                </View>
              ))}
            </Swiper>
          </View>

          <View style={styles.addTaskWrapper}>
            <AddTaskButton onPress={handleOpenBottomSheet} customStyles={null}/>
          </View>
        </View>
        <AddTaskBottomSheet hasDay={false} ref={bottomSheetRef} handleCloseBottomSheet={handleCloseBottomSheet}/>
        <DayTasksBottomSheet ref={dayBottomSheetRef}/>
    </LinearGradient>
  )
}
const styles =  StyleSheet.create({
  gradient: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 16,
  },

  todayTasksContainer: {
    marginBottom: 20,
    height: '58%',
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
  },

  todayTasksHeader: {
    fontSize: 20,
    alignSelf: 'center',
  },

  calendarBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  calendarHeader: {
    fontSize: 25,
  },

  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 172,
    height: 40,
    paddingLeft: 16,
    paddingRight: 20,
    backgroundColor: colors.background,
    borderRadius: 40,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1
  },

  monthContainer: {
    flex: 1,
    alignItems: 'center',
  },

  month: {
    fontSize: 18,
    textTransform: 'uppercase',
  },

  calendarIcon: {
    width: 36,
    height: 36,
  },

  scrollableCalendar: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  dayItem: {
    width: 72,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.background,
    shadowColor: '#0000004D',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1
  },

  weekDayLabel: {
    fontSize: 13,
    textTransform: 'uppercase'
  },

  dayItemDate: {
    fontSize: 49,
  },

  addTaskWrapper: {
    position: 'absolute',
    bottom: 26
  },

  androidShadow: {
    elevation: 10
  },

  fetchingError: {
    fontSize: 18
  },

  noTasksForToday: {
    alignSelf: 'center',
    marginTop: 16,
    fontSize: 20,
  }
})