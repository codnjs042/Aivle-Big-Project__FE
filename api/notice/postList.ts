import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

export async function postListFetch(token: string, setToken: (token: string) => void, page: number) {
  console.log(`${page} call`)
  return authFetch(`${backendConfig.serverUrl}/api/introduce/post/?page=${page}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }, token, setToken);
}