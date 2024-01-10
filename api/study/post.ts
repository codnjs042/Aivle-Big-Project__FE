import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

export async function audioPost(token: string, setToken: (token: string) => void, data: File, id: number) {
  const formData = new FormData();
  formData.append('audio_path', data);

  return await authFetch(`${backendConfig.serverUrl}/api/study/sentence/${id}/`, {
    method: 'POST',
    credentials: 'include',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    body: formData,
  }, token, setToken);
}