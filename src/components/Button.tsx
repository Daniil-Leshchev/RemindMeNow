import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { forwardRef } from 'react';
import React from 'react';
import Text from "@/components/StyledText";

type ButtonProps = {
  text: string,
  fontSize: number,
  fontColor: string,
  style: StyleProp<ViewStyle> | null
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, fontSize, fontColor, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={[styles.container, pressableProps.style]}>
        <Text style={[styles.text, {fontSize: fontSize, color: fontColor}]}>{text}</Text>
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
    color: '#fff',
    fontFamily: 'Inter'
  },
});

export default Button;