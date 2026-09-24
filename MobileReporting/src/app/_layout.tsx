import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="user-dashboard" />
        <Stack.Screen name="select-room" />
        <Stack.Screen name="report-damage" />
        <Stack.Screen name="campus-map" />
        <Stack.Screen name="building-map" />
        <Stack.Screen name="admin-dashboard" />
        <Stack.Screen name="admin-room-reports" />
      </Stack>
    </GestureHandlerRootView>
  );
}