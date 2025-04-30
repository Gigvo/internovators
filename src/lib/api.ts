const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RequestOptions extends RequestInit {}
export async function api<T>(path: string, opts: RequestOptions = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    credentials: "include", // if you ever switch to cookie-based tokens
    ...opts,
  });
  if (!res.ok) throw new Error((await res.json()).message || res.statusText);
  return (await res.json()) as T;
}
