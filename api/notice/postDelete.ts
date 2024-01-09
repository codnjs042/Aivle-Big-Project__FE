import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

export async function postDelete(token: string, setToken: (token: string) => void, id: number) {
  return authFetch(`${backendConfig.serverUrl}/api/introduce/post/${id}/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }, token, setToken);
}