import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Component } from 'react';
import React from 'react';
import Text from "@/components/StyledText";
import { Image } from 'expo-image';

const colors = {
  background: '#C0CEFF',
  addTaskText: '#6C6C6C',
  shadow: '#23292F40'
}

type Props = {
  style: StyleProp<ViewStyle>;
};

export default class AddTaskButton extends Component<Props> {
  render() {
    return (
      <Pressable style={[styles.container, {...this.props.style}]}>
        <View style={styles.input}>
          <Text style={styles.text}>Добавить задачу</Text>
        </View>
        <View style={styles.addButton}>
          <Image 
            source={require('@assets/icons/mainScreen/plus.svg')}
            style={{width: 32, height: 32}}
          />
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    backgroundColor: colors.background,
    borderRadius: 40,
    width: 280,
    paddingVertical: 24,
    paddingLeft: 15,
    marginRight: 12,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 0.3,
  },

  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 0.3,
  },

  text: {
    color: colors.addTaskText,
    fontSize: 16,
  },
});