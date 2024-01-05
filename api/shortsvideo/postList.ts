import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

export async function postListFetch(token: string, setToken: (token: string) => void) {
  return authFetch(`${backendConfig.serverUrl}/api/shorts/list/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }, token, setToken);
}