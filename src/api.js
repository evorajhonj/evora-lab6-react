const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export async function request(path, method = 'GET', body, token) {
  if (!base) throw new Error('The API URL has not been configured.');
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json().catch(() => ({ error: 'The API is unavailable. Please try again.' }));
  if (!response.ok) {
    const error = new Error(data.error || 'Request failed.');
    error.status = response.status;
    throw error;
  }
  return data;
}
