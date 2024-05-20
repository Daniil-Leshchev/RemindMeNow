import React from 'react';
import { Text, TextProps } from 'react-native';
export default (props: TextProps) => (
  <Text {...props}
    style={[{ fontFamily: 'Inter' }, props.style]}>
    {props.children}
  </Text>
)