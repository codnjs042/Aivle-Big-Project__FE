import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

export async function audioPost(token: string, setToken: (token: string) => void, data: Blob, id: number) {
  const formData = new FormData();
  formData.append('audio_path', data);

    const response = await authFetch(`${backendConfig.serverUrl}/api/study/sentence/${id}/`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }, token, setToken);
}