import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

export async function postFetch(token: string, setToken: (token: string) => void, id: number) {
  return authFetch(`${backendConfig.serverUrl}/api/introduce/post/${id}/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }, token, setToken);
}