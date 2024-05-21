import { Animated, Pressable, StyleSheet, View } from 'react-native';
import Text from "@/components/StyledText";
import React, { useState } from 'react';
import TaskIcon from '@components/TaskIcon';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Image } from 'expo-image';
import moment from 'moment';
import { Tables } from '@/lib/database.types';
import { useDeleteTask } from '@/api/delete';

const colors = {
  background: '#8A9DCDB5',
  shadow: '#5B64AE33'
}

type TaskView = {
  task: Tables<'tasks'>,
  isTodayView: boolean,
}

const TaskItem = ({ task, isTodayView }: TaskView) => {
  const { mutate: deleteTask } = useDeleteTask();

  const timeFormat = "HH:mm";
  const formatDate = () => {
    const start = moment(task.startDate).local().format(timeFormat);
    const end = moment(task.endDate).local().format(timeFormat);
    return `${start} – ${end}`;
  }

  if (!isTodayView) {
    const [opacity, setOpacity] = useState(0.2);

    const rightSwipe = (dragX: Animated.Value) => {
      const trans = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [-1, 0],
        extrapolate: 'clamp'
      });

      return (
        <Animated.View style={[styles.actions, { opacity, transform: [{translateX: trans}] }]}>
          <Pressable>
            <Image
              source={require('@assets/icons/swipeableActions/tick.svg')}
              style={{ width: 27, height: 22}}
            />
          </Pressable>

          <Pressable>
            <Image
              source={require('@assets/icons/swipeableActions/cross.svg')}
              style={{ width: 24, height: 24}}
            />
          </Pressable>

          <Pressable onPress={() => deleteTask(task.id)}>
            <Image
              source={require('@assets/icons/swipeableActions/trashCan.svg')}
              style={{ width: 32, height: 32}}
            />
          </Pressable>
        </Animated.View>
      )
    }
    return (
      <Swipeable
        onSwipeableWillClose={() => setOpacity(0)}
        onSwipeableWillOpen={() => setOpacity(1)}
        renderRightActions={rightSwipe}
        rightThreshold={20}>
        <View style={[styles.taskContainer, styles.androidShadow]}>
          <TaskIcon type={task.type} isSmall={false}/>
          <Text style={styles.title}>{task.title}</Text>
          { task.isAllDay ? 
            <Text style={styles.time}>весь день</Text> :
            <Text style={styles.time}>{formatDate()}</Text>}
        </View>
      </Swipeable>
    )
  }

  return (
    <View style={[styles.taskContainer, styles.androidShadow]}>
      <TaskIcon type={task.type} isSmall={false}/>
      <Text style={styles.title}>{task.title}</Text>
      { task.isAllDay ? 
        <Text style={styles.time}>весь день</Text> :
        <Text style={styles.time}>{formatDate()}</Text>}
    </View>
  )
}

export default TaskItem;

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 18,
    paddingRight: 28,
    backgroundColor: colors.background,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
  },

  title: {
    fontSize: 16,
    maxWidth: 160,
  },

  time: {
    fontSize: 16,
    marginLeft: 'auto'
  },

  androidShadow: {
    elevation: 10
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    gap: 12
  }
});