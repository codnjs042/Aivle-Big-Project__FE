import {backendConfig} from '../apiconfig';
import {authFetch} from "@/api/authFetch";

export async function videoPost(token: string, setToken: (token: string) => void, data: File) {
  const formData = new FormData();
  formData.append('file_path', data);

  return await authFetch(`${backendConfig.serverUrl}/api/shorts/`, {
    method: 'POST',
    credentials: 'include',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    body: formData,
  }, token, setToken);
}