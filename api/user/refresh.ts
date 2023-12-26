import {backendConfig} from '../apiconfig';

export async function refreshFetch() {
  return fetch(`${backendConfig.serverUrl}/api/user/refresh/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}