import { Link, Stack } from "expo-router";
import { useState } from "react"
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native"
import Button from "@/components/Button";
import Text from "@/components/StyledText";
import React from 'react';
import { supabase } from "@/lib/supabase";

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error)
      Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
        <Stack.Screen options={{headerShown: false}}/>
        <Text style={styles.header}>Авторизируйся</Text>
        <Text style={styles.label}>И начни планировать свой день в приложении</Text>
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor="#828282"
            value={email}
            autoCapitalize='none'
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor="#828282"
            value={password}
            autoCapitalize='none'
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button text={loading ? 'Вход...' : 'Вход'} onPress={signInWithEmail} disabled={loading} fontSize={17}/>
          <View style={styles.registerBox}>
            <Text style={styles.noAccount}>Еще нет аккаунта?</Text>
            <Link href='/sign-up' style={styles.textButton}>
              Зарегистрироваться
            </Link>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
    backgroundColor: '#fff',
  },

  wrapper: {
    alignItems: 'center'
  },

  label: {
    color: '#989898',
    marginBottom: 76,
    fontSize: 13,
    fontFamily: 'Inter-Light',
  },

  input: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    color: '#828282',
    backgroundColor: '#EFEFEF',
    borderColor: '#D2D2D2',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    width: 335,
  },

  textButton: {
    marginLeft: 4,
    color: '#7412B0',
    textDecorationLine: 'underline',
    fontSize: 15,
    fontFamily: 'Inter'
  },

  header: {
    color: '#7412B0',
    fontSize: 22,
    fontFamily: 'Inter-Medium',
    marginBottom: 13,
  },

  registerBox: {
    flexDirection: 'row',
  },
  
  noAccount: {
    fontSize: 15,
  }
});

export default SignInScreen;