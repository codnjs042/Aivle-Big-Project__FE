import {backendConfig} from '../apiconfig';

interface RequestDTO {
  token: string;
}

interface ResponseDTO {
  token: string;
  email: string;
  nickname: string;
  genrePrefers: bigint;
  artistPrefers: bigint;
}

export async function verify(tokenData: RequestDTO) {
  const response = await fetch(`${backendConfig.serverUrl}/api/user/verify/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tokenData),
  });
  if (response.ok) {
    return await response.json() as ResponseDTO;
  } else if (response.status === 401) {
    throw new Error('유효하지 않은 토큰입니다.');
  } else {
    throw new Error('서버에 문제가 생겨 관리자에게 문의하시기 바랍니다.');
  }
}