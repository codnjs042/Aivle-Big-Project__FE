import {backendConfig} from '../apiconfig';

export async function emailFetch(email: string) {
  return fetch(`${backendConfig.serverUrl}/api/user/email/?email=${encodeURIComponent(email)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}