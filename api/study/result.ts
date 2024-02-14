import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

export async function postFetch(token: string, setToken: (token: string) => void, id: number) {
  return authFetch(`${backendConfig.serverUrl}/api/study/sentence/${id}/result`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }, token, setToken);
}