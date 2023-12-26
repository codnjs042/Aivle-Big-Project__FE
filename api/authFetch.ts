import {refresh} from "@/api/user/refresh";

export async function authFetch(url: RequestInfo | URL, options: RequestInit) {
  const token = localStorage.getItem("access_token");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  let response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
      const refreshRes = await refresh({});
      if (refreshRes.ok) {
        localStorage.setItem("access_token", refreshRes.token);
        response = await authFetch(url, options);
      }
    }
  }
}