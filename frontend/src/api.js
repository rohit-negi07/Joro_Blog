// Change this if your backend runs elsewhere
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
export async function apiSend(path, method, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
