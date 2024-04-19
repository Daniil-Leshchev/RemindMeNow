import { StyleSheet, View } from 'react-native';
import Text from "@/components/StyledText";
import React from 'react';

const TaskItem = ({task}: any) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.time}>{task.time}</Text>
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
    backgroundColor: '#8A9DCDB5',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    fontSize: 16,
    maxWidth: 140,
  },

  time: {
    fontSize: 16,
  }
});