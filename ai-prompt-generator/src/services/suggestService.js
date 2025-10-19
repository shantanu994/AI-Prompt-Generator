export async function fetchSuggestions({ input, category }) {
  const res = await fetch('/api/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input, category })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Proxy request failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data;
}
