import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
    const { session } = useAuth();
    if (session) {
        return <Redirect href={'/'}/>
    }
    return <Stack/>
}