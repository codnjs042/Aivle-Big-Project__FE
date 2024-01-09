import {authFetch} from "@/api/authFetch";
import {backendConfig} from "@/api/apiconfig";

interface RequestDTO {
  content: string;
}
export async function commentFix(token: string, setToken: (token: string) => void, id: number, data: RequestDTO) {
  return authFetch(`${backendConfig.serverUrl}/api/introduce/post/${id}/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }, token, setToken);
}