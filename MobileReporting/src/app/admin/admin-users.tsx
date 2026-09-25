import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  View,
} from "react-native";

import { C } from "../../constants/palette";
import { Page, Header, Card } from "../../components/Kit";
import { apiRequest } from "../../services/api";

type UserAccount = {
  id: number;
  name: string;
  email: string;
  role: string;
};

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase() || "?";
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiRequest("/admin/users");
      const rows = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : [];

      setUsers(rows);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load user accounts."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;

    return users.filter((user) =>
      `${user.name} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(term)
    );
  }, [users, search]);

  const showManagePreview = (user: UserAccount) => {
    Alert.alert(
      "Manage account",
      `${user.name}\n${user.email}\nRole: ${user.role}\n\nAccount actions are not connected yet.`
    );
  };

  return (
    <Page>
      <Header
        title="User management"
        sub="Search and manage accounts"
        back
      />

      <Card>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search name, email, or role"
          placeholderTextColor={C.muted}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            backgroundColor: C.soft,
            color: C.ink,
            borderRadius: 10,
            paddingHorizontal: 13,
            paddingVertical: 11,
            fontSize: 14,
          }}
        />
      </Card>

      {loading ? (
        <Card>
          <View style={{ alignItems: "center", paddingVertical: 12 }}>
            <ActivityIndicator color={C.maroon} />
            <Text style={{ color: C.muted, marginTop: 8 }}>
              Loading accounts...
            </Text>
          </View>
        </Card>
      ) : error ? (
        <Card>
          <Text style={{ color: C.ink, fontWeight: "800" }}>
            Unable to load accounts
          </Text>
          <Text style={{ color: C.muted, marginTop: 5 }}>{error}</Text>
          <Text
            onPress={loadUsers}
            accessibilityRole="button"
            style={{
              color: C.maroon,
              fontWeight: "800",
              marginTop: 12,
            }}
          >
            Try again
          </Text>
        </Card>
      ) : filteredUsers.length === 0 ? (
        <Card>
          <Text style={{ color: C.ink, fontWeight: "800" }}>
            {search.trim() ? "No matching accounts" : "No user accounts"}
          </Text>
          <Text style={{ color: C.muted, marginTop: 5 }}>
            {search.trim()
              ? "Try a different name, email, or role."
              : "Registered accounts will appear here."}
          </Text>
        </Card>
      ) : (
        filteredUsers.map((user) => (
          <Card
            key={user.id}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                backgroundColor: C.soft,
                color: C.maroon,
                padding: 12,
                borderRadius: 10,
                fontWeight: "900",
                overflow: "hidden",
              }}
            >
              {initials(user.name)}
            </Text>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: C.ink, fontWeight: "700" }}>
                {user.name}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: C.muted,
                  marginTop: 2,
                }}
              >
                {user.role} · {user.email}
              </Text>
            </View>

            <Text
              onPress={() => showManagePreview(user)}
              accessibilityRole="button"
              style={{ color: C.maroon, fontWeight: "800", marginLeft: 8 }}
            >
              Manage
            </Text>
          </Card>
        ))
      )}

      {!loading && !error && users.length > 0 ? (
        <Text
          style={{
            color: C.muted,
            fontSize: 11,
            textAlign: "center",
            marginTop: 8,
            marginBottom: 12,
          }}
        >
          Showing {filteredUsers.length} of {users.length} accounts
        </Text>
      ) : null}
    </Page>
  );
}