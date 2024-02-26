import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

export async function newComment(token: string, setToken: (token: string) => void, data: string, id: number) {
  return authFetch(`${backendConfig.serverUrl}/api/introduce/post/${id}/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }, token, setToken);
}