const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

// Simple CORS middleware to allow requests from the React dev server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    return res.sendStatus(200);
  }
  next();
});

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

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}
