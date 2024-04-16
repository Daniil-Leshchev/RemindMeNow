import React from 'react';
import { Text } from 'react-native';
export default (props:any) => <Text {...props} style={[{ fontFamily: 'Inter' }, props.style]}>{props.children}</Text>