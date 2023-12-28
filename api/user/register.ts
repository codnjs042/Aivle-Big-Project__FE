import {backendConfig} from '../apiconfig';

interface RequestDTO {
  email: string;
  password: string;
  nickname: string;
  selectedGenres: number;
  selectedArtist: number;
  captcha: string;
}

export function registerFetch(data: RequestDTO) {
  return fetch(`${backendConfig.serverUrl}/api/user/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}