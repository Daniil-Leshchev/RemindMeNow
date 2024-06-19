import React, { useEffect, useRef, useState } from "react";
import { PropsWithChildren } from "react";
import { registerForPushNotificationsAsync } from "@/lib/notifications";
import * as Notifications from 'expo-notifications';
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({children} : PropsWithChildren) => {
  const { profile } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken);
    if (!newToken)
      return;
    if (!profile)
      return;
    await supabase
      .from('profiles')
      .update({ expo_push_token: newToken })
      .eq('id', profile.id);
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
        .then((token) => savePushToken(token));

    notificationListener.current =
    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });
  
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        
    });
  
    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [profile]);

  return <>{children}</>
}

export default NotificationProvider;