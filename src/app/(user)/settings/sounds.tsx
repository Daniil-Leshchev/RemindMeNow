import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Text from '@components/StyledText';
import { Stack, router } from "expo-router";
import { Image } from 'expo-image';
import { Switch } from "react-native-switch";

const colors = {
  header: '#797979',
  item: '#F3F3F3',
  text: '#232323'
}

export default function Sounds() {
  const [creating, setCreating] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [postponing, setPostponing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.headerContainer}>
          <Image
            source={require('@assets/icons/settings/navigation/back.svg')}
            style={{ width: 7, height: 14 }}
          />
          <Text style={styles.header}>Звуки в приложении</Text>
        </Pressable>

        <View style={styles.settingsContainer}>
          <View style={styles.item}>
            <Switch
                value={creating}
                onValueChange={() => setCreating(!creating)}
                barHeight={24}
                backgroundActive='#73D877DB'
                backgroundInactive='#43434429'
                circleSize={20}
                switchLeftPx={2.5}
                switchRightPx={2.5}
                circleBorderWidth={0}
                renderActiveText={false}
                renderInActiveText={false}
              />
              <Text style={styles.text}>звук создания</Text>
          </View>

          <View style={styles.item}>
            <Switch
                value={completing}
                onValueChange={() => setCompleting(!completing)}
                barHeight={24}
                backgroundActive='#73D877DB'
                backgroundInactive='#43434429'
                circleSize={20}
                switchLeftPx={2.5}
                switchRightPx={2.5}
                circleBorderWidth={0}
                renderActiveText={false}
                renderInActiveText={false}
              />
              <Text style={styles.text}>звук завершения</Text>
          </View>

          <View style={styles.item}>
            <Switch
                value={postponing}
                onValueChange={() => setPostponing(!postponing)}
                barHeight={24}
                backgroundActive='#73D877DB'
                backgroundInactive='#43434429'
                circleSize={20}
                switchLeftPx={2.5}
                switchRightPx={2.5}
                circleBorderWidth={0}
                renderActiveText={false}
                renderInActiveText={false}
              />
              <Text style={styles.text}>звук переноса</Text>
          </View>

          <View style={styles.item}>
            <Switch
                value={deleting}
                onValueChange={() => setDeleting(!deleting)}
                barHeight={24}
                backgroundActive='#73D877DB'
                backgroundInactive='#43434429'
                circleSize={20}
                switchLeftPx={2.5}
                switchRightPx={2.5}
                circleBorderWidth={0}
                renderActiveText={false}
                renderInActiveText={false}
              />
              <Text style={styles.text}>звук удаления</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    marginTop: 120
  },

  header: {
    fontFamily: 'Inter-Medium',
    fontSize: 22,
    color: colors.header
  },

  headerContainer: {
    marginLeft: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 40
  },

  settingsContainer: {
    paddingHorizontal: 27,
    gap: 14
  },

  item: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.item,
    paddingVertical: 14,
    paddingLeft: 16
  },

  text: {
    fontSize: 18,
    color: colors.text
  }
})