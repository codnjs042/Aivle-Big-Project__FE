import {authFetch} from "@/api/authFetch";
import {backendConfig} from "@/api/apiconfig";

export async function postFetch(token: string, setToken: (token: string) => void, id: number) {
  return authFetch(`${backendConfig.serverUrl}/api/introduce/post/${id}/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }, token, setToken);
}