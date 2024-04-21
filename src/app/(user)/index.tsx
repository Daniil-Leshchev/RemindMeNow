import React, { useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, ScrollView } from 'react-native';
import Text from "@/components/StyledText";
import { LinearGradient } from 'expo-linear-gradient';
import todayTasks from '@assets/data/todayTasks';
import TaskItem from '@/components/TaskItem';
import { Image } from 'expo-image';
const gradientColors = ['#9FA1E3', '#19287A'];
const colors = {
  background: '#C0CEFF',
  shadow: '#2F366C4D'
}

export default function MainScreen() {

  return (
      <LinearGradient
        style={styles.gradient}
        colors={gradientColors}>
          <View style={styles.wrapper}>
            <View style={styles.todayTasksContainer}>
              {/* TODO: сделать его pressable со ссылкой на экран задач текущего дня */}
              <FlatList
                ListHeaderComponent={
                  <Text style={styles.todayTasksHeader}>Задачи на сегодня:</Text>
                }
                data={todayTasks}
                renderItem={({item}) => <TaskItem task={item}/>}
                contentContainerStyle={{
                  gap: 22,
                  paddingVertical: 16,
                  paddingHorizontal: 14
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={styles.calendarContainer}>
              <View style={styles.calendarBlock}>
                <Text style={styles.calendarHeader}>Календарь</Text>
                <Pressable style={styles.calendarButton}>
                  <View style={styles.monthContainer}>
                    <Text style={styles.month}>Апрель</Text>
                  </View>
                  <Image 
                    source={require('@assets/icons/mainScreen/calendar.svg')}
                    style={styles.calendarIcon}
                  />
                </Pressable>
              </View>
            </View>
          </View>
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  wrapper: {
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 16,
  },

  todayTasksContainer: {
    marginBottom: 20,
    height: 440,
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 0.3,
  },

  todayTasksHeader: {
    fontSize: 20,
    alignSelf: 'center',
  },

  calendarContainer: {
    marginBottom: 20,
  },

  calendarBlock: {
    flexDirection: 'row',
    width: '100%',
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
    height: 10
  }
})