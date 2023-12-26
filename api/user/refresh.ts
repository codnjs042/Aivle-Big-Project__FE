import {backendConfig} from '../apiconfig';

interface RequestDTO {
}


export async function refreshFetch(data: RequestDTO) {
  return fetch(`${backendConfig.serverUrl}/api/user/refresh/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}