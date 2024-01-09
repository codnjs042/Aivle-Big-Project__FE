import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

interface RequestDTO {
  audio_path: File;
}

export async function audioPost(token: string, setToken: (token: string) => void, data: RequestDTO, id: number) {
  const formData = new FormData();
  formData.append('audio_path', data.audio_path);

    const response = await authFetch(`${backendConfig.serverUrl}/api/study/sentence/${id}/`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }, token, setToken);
}