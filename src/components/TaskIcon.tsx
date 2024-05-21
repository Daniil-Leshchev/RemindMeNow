import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { TaskType } from '@/lib/database.types';

type TaskIconProps = {
  type: TaskType,
  isSmall: boolean
}

const TaskIcon = ({ type, isSmall }: TaskIconProps) => {
  let imagePath = require('@assets/icons/task/standard.svg');
  if (type === 'prior')
    imagePath = require('@assets/icons/task/prior.svg');
  else if (type === 'event')
    imagePath = require('@assets/icons/task/event.svg');
  return (
    <Image 
      source={imagePath}
      style={isSmall ? styles.smallIcon : styles.standardIcon}
    />
  )
}

const styles = StyleSheet.create({
  standardIcon: {
    width: 32,
    height: 32,
    marginRight: 16
  },

  smallIcon: {
    width: 20,
    height: 20,
    marginRight: 8
  }
});

export default TaskIcon;