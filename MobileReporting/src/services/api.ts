import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.1.7:8000/api"; // i change and ip address diri if lahi ang wifi nimo, adto cmd then ipconfig, pangitaa ipv4


export async function apiRequest(
  path: string,
  options: RequestInit = {}
) {
  const token = await SecureStore.getItemAsync("auth_token");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message || `Request failed (${response.status})`
    );
  }

  return result;
}

export async function login(login: string, password: string) {
  const result = await apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      device_name: "Expo Mobile App",
    }),
  });

  await SecureStore.setItemAsync("auth_token", result.token);
  return result.user;
}

export async function getMyProfile() {
  return apiRequest("/me");
}

export async function logout() {
  try {
    await apiRequest("/logout", { method: "POST" });
  } finally {
    await SecureStore.deleteItemAsync("auth_token");
  }
}