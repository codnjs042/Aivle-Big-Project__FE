import {backendConfig} from '../apiconfig';

interface RequestDTO {
  refresh: string;
}

interface ResponseDTO {
  email: string;
  nickname: string;
  genrePrefers: bigint;
  artistPrefers: bigint;
}
export async function logout(data: RequestDTO) {
  const response = await fetch(`${backendConfig.serverUrl}/api/user/logout/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log(response);
  if (response.ok) {
    return await response.json() as ResponseDTO;
  } else {
    throw new Error('서버에 문제가 생겨 관리자에게 문의하시기 바랍니다.');
  }
}