import {refreshFetch} from "@/api/user/refresh";

export async function authFetch(url: RequestInfo | URL, options: RequestInit, access: string, setAccess: (token: string) => void): Promise<Response> {
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${access}`,
  };
  const response = await fetch(url, { ...options, headers: headers });
  if (response.status === 401) {
      console.log('access 재발급');
      const refresh = await refreshFetch();
      console.log('refresh 응답:', refresh);
      if (refresh.ok) {
        const data = await refresh.json();
        const new_access = data.access;
        console.log('새로운 access', new_access);
        setAccess(new_access as string);
        const new_headers = {
          ...options.headers,
          Authorization: `Bearer ${new_access}`,
        };
        const retry = await fetch(url, { ...options, headers: new_headers })
        if (retry.ok) {
          return retry;
        }
      }
    }
  return response;
}