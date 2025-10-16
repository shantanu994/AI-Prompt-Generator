import axios from 'axios';

export async function fetchSuggestions({ input, category }) {
  const res = await axios.post('/api/suggest', { input, category });
  return res.data;
}
