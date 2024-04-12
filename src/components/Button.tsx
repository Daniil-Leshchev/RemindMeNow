import { Pressable, StyleSheet, Text, View } from 'react-native';
import { forwardRef } from 'react';
import React = require('react');

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7412B0',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 24,
    marginBottom: 22,
    width: 280,
  },

  text: {
    fontSize: 17,
    color: '#fff',
    fontFamily: 'Inter'
  },
});

export default Button;