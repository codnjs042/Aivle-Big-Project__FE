import {backendConfig} from '../apiconfig';

interface RequestDTO {
  email: string;
  password: string;
  captcha: string;
}

export function loginFetch(data: RequestDTO) {
  return fetch(`${backendConfig.serverUrl}/api/user/login/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}