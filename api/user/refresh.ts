import {backendConfig} from '../apiconfig';

interface RequestDTO {
}

interface ResponseDTO {
  token: string;
}

export async function refresh(data: RequestDTO) {
  const response = await fetch(`${backendConfig.serverUrl}/api/user/refresh/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json() as ResponseDTO;
  } else if (response.status === 401) {
    throw new Error('다시 로그인 해주세요.');
  } else {
    throw new Error('서버에 문제가 생겨 관리자에게 문의하시기 바랍니다.');
  }
}