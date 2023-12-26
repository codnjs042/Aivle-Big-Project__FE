import {backendConfig} from '../apiconfig';

export async function logoutFetch() {
  return fetch(`${backendConfig.serverUrl}/api/user/logout/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}