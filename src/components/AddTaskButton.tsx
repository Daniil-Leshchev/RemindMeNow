import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { forwardRef } from 'react';
import React from 'react';
import Text from "@/components/StyledText";
import { Image } from 'expo-image';

const colors = {
  background: '#C0CEFF',
  addTaskText: '#6C6C6C',
  shadow: '#23292F40'
}

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & {
  customStyles: ViewStyle | null;
};

const AddTaskButton = forwardRef<View | null, ButtonProps>(
  ({customStyles, ...pressableProps}, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        <View style={[styles.input, customStyles]}>
          <Text style={styles.text}>Добавить задачу</Text>
        </View>
        <View style={[styles.addButton, styles.androidShadow]}>
          <Image
            source={require('@assets/icons/mainScreen/plus.svg')}
            style={{width: 32, height: 32}}
          />
        </View>
      </Pressable>
    );
  }
);

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
    shadowColor: '#23292F40',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1
  },

  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: colors.background,
    shadowColor: '#00000040',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
  },

  text: {
    color: colors.addTaskText,
    fontSize: 16,
  },

  androidShadow: {
    elevation: 10
  }
});

export default AddTaskButton;