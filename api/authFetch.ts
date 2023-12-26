import {refreshFetch} from "@/api/user/refresh";

export async function authFetch(url: RequestInfo | URL, options: RequestInit, token: string, setToken: (token: string) => void): Promise<Response> {
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  let response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
      const refresh = await refreshFetch({});
      if (refresh.ok) {
        const data = await refresh.json();
        setToken(data.token as string);
        return authFetch(url, options, data.token as string, setToken)
      }
    }
  return response;
}