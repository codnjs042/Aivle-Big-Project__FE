import { backendConfig } from '../apiconfig';
import { authFetch } from "@/api/authFetch";

export async function viewpostFetch(token: string, setToken: (token: string) => void, data: string) {
  try {
    const response = await authFetch(`${backendConfig.serverUrl}/media/${data}`, {
      method: 'GET',
      credentials: 'include',
    }, token, setToken);

    // JSON으로 파싱하지 않고 그대로 반환
    return response;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}