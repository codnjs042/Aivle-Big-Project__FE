import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

export async function infoFetch(token: string, setToken: (token: string) => void) {
  return authFetch(`${backendConfig.serverUrl}/api/user/info/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }, token, setToken);
}