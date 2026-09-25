import React, { useCallback, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { C } from "../../constants/palette";
import { Page, Header, Card, Field, Button } from "../../components/Kit";
import { apiRequest, logout } from "../../services/api";

type Profile = {
  id: number;
  name: string;
  email: string;
  username: string | null;
};

export default function UserSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      const response = await apiRequest("/user");
      const data = response?.data ?? response;

      setProfile(data);
      setName(data?.name ?? "");
      setEmail(data?.email ?? "");
      setUser(data?.username ?? "");
    } catch (error: any) {
      Alert.alert(
        "Could not load profile",
        error?.message || "Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadProfile();
    }, [loadProfile])
  );

  const handleSave = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanUser = user.trim();

    if (!cleanName || !cleanEmail) {
      Alert.alert("Missing information", "Enter your name and email.");
      return;
    }

    setSaving(true);

    try {
      const response = await apiRequest("/user/profile", {
        method: "PATCH",
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          username: cleanUser || null,
        }),
      });

      const updated = response?.data ?? response;

      setProfile(updated);
      setName(updated?.name ?? cleanName);
      setEmail(updated?.email ?? cleanEmail);
      setUser(updated?.username ?? cleanUser);

      Alert.alert("Profile updated", "Your account details have been saved.");
    } catch (error: any) {
      Alert.alert(
        "Save failed",
        error?.message || "Could not update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    try {
      await logout();
      router.replace("/login");
    } catch (error: any) {
      Alert.alert(
        "Logout failed",
        error?.message || "Please try again."
      );
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <Page>
      <Header
        title="Profile & settings"
        sub="Manage your account"
        back
      />

      <Card>
        <Text style={{ color: C.ink, fontWeight: "800" }}>
          Profile details
        </Text>

        {loading ? (
          <View style={{ paddingVertical: 24, alignItems: "center" }}>
            <ActivityIndicator color={C.ink} />
            <Text style={{ color: C.muted, marginTop: 8 }}>
              Loading profile...
            </Text>
          </View>
        ) : (
          <>
            <Field
              label="Full name"
              value={name}
              onChangeText={setName}
            />

            <Field
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Field
              label="Username"
              value={user}
              onChangeText={setUser}
            />

            <Text style={{ color: C.muted, fontSize: 11 }}>
              Account ID is system-managed and cannot be edited.
              {profile?.id ? ` Account ID: ${profile.id}` : ""}
            </Text>

            <View style={{ marginTop: 16 }}>
              <Button
                title={saving ? "Saving..." : "Save changes"}
                onPress={() => {
                  if (!saving) handleSave();
                }}
              />
            </View>
          </>
        )}
      </Card>

      <Button
        title={loggingOut ? "Logging out..." : "Log out"}
        outline
        onPress={() => {
          if (!loggingOut) handleLogout();
        }}
      />
    </Page>
  );
}