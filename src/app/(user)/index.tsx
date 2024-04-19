import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Text from "@/components/StyledText";
import { LinearGradient } from 'expo-linear-gradient';
import todayTasks from '@assets/data/todayTasks';
import TaskItem from '@/components/TaskItem';
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
                style={styles.todayTasksList}
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
  },

  todayTasksContainer: {
    height: 440,
    width: 356,
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

  todayTasksList: {
    flex: 1,
    width: '100%',
  }
})