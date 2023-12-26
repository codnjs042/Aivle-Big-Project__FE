import {backendConfig} from '../apiconfig';

interface RequestDTO {
}

interface ResponseDTO {
}
export async function logoutFetch(data: RequestDTO) {
  return fetch(`${backendConfig.serverUrl}/api/user/logout/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}