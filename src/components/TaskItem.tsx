import { StyleSheet, View } from 'react-native';
import Text from "@/components/StyledText";
import React from 'react';
import { Image } from 'expo-image';

const colors = {
  background: '#8A9DCDB5',
  shadow: '#5B64AE33'
}

const TaskItem = ({task}: any) => {
  //TODO: dynamic image paths bases on task type
  const icon = `standard.svg`;
  return (
    <View style={styles.taskContainer}>
      <Image 
        source={require(`@assets/icons/task/${icon}`)}
        style={{ width: 32, height: 32, marginRight: 16}}/>
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
    backgroundColor: colors.background,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 40,
  },

  title: {
    fontSize: 16,
    maxWidth: 140,
  },

  time: {
    fontSize: 16,
    marginLeft: 'auto'
  }
});