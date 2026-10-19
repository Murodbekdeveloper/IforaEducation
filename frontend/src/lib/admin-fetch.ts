export async function adminFetch(
  path: string,
  options: { method?: string; body?: unknown } = {},
) {
  const res = await fetch(`/api/proxy${path}`, {
    method: options.method ?? "GET",
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? "Amalni bajarib boʻlmadi.");
  }
  return res.json();
}
