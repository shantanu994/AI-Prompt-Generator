const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

// Simple proxy route to call Gemini (placeholder URL)
app.post('/api/suggest', async (req, res) => {
  const { input, category } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not set in server environment' });
  }

  try {
    // NOTE: Replace the below URL and request shape with Gemini's actual endpoint and payload
    const response = await axios.post('https://api.gemini.example/v1/generate', {
      prompt: `Suggest improved prompts for category ${category} and input: ${input}`
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return res.json(response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message || err);
    return res.status(502).json({ error: 'Failed to call Gemini API' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
