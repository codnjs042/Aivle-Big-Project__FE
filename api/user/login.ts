import {backendConfig} from '../apiconfig';

interface RequestDTO {
  email: string;
  password: string;
  recaptcha: string;
}

interface ResponseDTO {
  email: string;
  nickname: string;
  genrePrefers: bigint;
  artistPrefers: bigint;
}
export async function login(data: RequestDTO) {
  const response = await fetch(`${backendConfig.serverUrl}/api/user/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json() as ResponseDTO;
  } else if (response.status === 400 || response.status === 401) {
    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
  } else {
    throw new Error('서버에 문제가 생겨 관리자에게 문의하시기 바랍니다.');
  }
}