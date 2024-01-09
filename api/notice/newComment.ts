import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

interface RequestDTO {
  content: string;
}
export async function newPost(token: string, setToken: (token: string) => void, data: RequestDTO) {
  return authFetch(`${backendConfig.serverUrl}/api/introduce/post/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }, token, setToken);
}