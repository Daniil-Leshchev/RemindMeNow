import { Animated, Pressable, StyleSheet, View } from 'react-native';
import Text from "@/components/StyledText";
import React, { useRef, useState } from 'react';
import TaskIcon from '@components/TaskIcon';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Image } from 'expo-image';
import moment, { MomentInput } from 'moment';
import { Tables } from '@/lib/database.types';
import { useDeleteTask } from '@/api/delete';
import { useUpdateTaskStatus } from '@/api/update';

const colors = {
  background: '#8A9DCDB5',
  shadow: '#5B64AE33',
  completedBackground: '#9ADC9DCF',
  location: '#353b48'
}

type TaskView = {
  task: Tables<'tasks'>,
  isTodayView: boolean,
}

const timeFormat = "HH:mm";
export const formatTime = (startDate : MomentInput, endDate : MomentInput) => {
  const start = moment(startDate).local().format(timeFormat);
  const end = moment(endDate).local().format(timeFormat);
  if (start == end)
    return start;
  return `${start} – ${end}`;
}

const TaskItem = ({ task, isTodayView }: TaskView) => {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTaskStatus } = useUpdateTaskStatus();
  const actionList = useRef<Swipeable>(null);

  if (!isTodayView) {
    const [opacity, setOpacity] = useState(0.2);

    const rightSwipe = (dragX: Animated.Value) => {
      const trans = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [-1, 0],
        extrapolate: 'clamp'
      });

      const changeTaskStatus = (task: TaskView['task']) => {
        if (task.status === 'active') {
          updateTaskStatus({ status: 'completed', id: task.id });
        }

        else if (task.status === 'completed') {
          updateTaskStatus({ status: 'active', id: task.id });
        }

        actionList.current?.close();
      }

      return (
        <Animated.View style={[styles.actions, { opacity, transform: [{translateX: trans}] }]}>
          <Pressable onPress={() => changeTaskStatus(task)}>
            <Image
              source={require('@assets/icons/swipeableActions/tick.svg')}
              style={{ width: 27, height: 22}}
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
        ref={actionList}
        onSwipeableWillClose={() => setOpacity(0)}
        onSwipeableWillOpen={() => setOpacity(1)}
        renderRightActions={rightSwipe}
        rightThreshold={20}>
        <View style={[styles.taskContainer, styles.androidShadow, { backgroundColor: task.status === 'active' ? colors.background : colors.completedBackground }]}>
          <TaskIcon type={task.type} isSmall={false}/>
          <View>
            <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
            <Text style={[task.isSchedule ? { display: 'flex' } : { display: 'none' }, styles.location]} numberOfLines={1}>{task.location}</Text>
          </View>
          { task.isAllDay ? 
            <Text style={styles.time}>весь день</Text> :
            <Text style={styles.time}>{formatTime(task.startDate, task.endDate)}</Text>}
        </View>
      </Swipeable>
    )
  }

  return (
    <View style={[styles.taskContainer, styles.androidShadow, { backgroundColor: task.status === 'active' ? colors.background : colors.completedBackground}]}>
      <TaskIcon type={task.type} isSmall={false}/>
      <View>
        <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
        <Text style={[task.isSchedule ? { display: 'flex' } : { display: 'none' }, styles.location]} numberOfLines={1}>{task.location}</Text>
      </View>
      { task.isAllDay ? 
        <Text style={styles.time}>весь день</Text> :
        <Text style={styles.time}>{formatTime(task.startDate, task.endDate)}</Text>}
    </View>
  )
}

export default TaskItem;

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 18,
    paddingRight: 26,
    backgroundColor: colors.background,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
    maxHeight: 84,
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
  },

  location: {
    maxWidth: 160,
    color: colors.location
  }
});