// server.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors'); // Add this line
require("dotenv").config()

app.use(bodyParser.json());
app.use(cors()); // Add this line

app.get("/",(req,res)=>{
  res.send("Home-page")
})

app.post('/generate-response', async (req, res) => {
  try {
    const { text } = req.body;
    
    // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    const apiKey = process.env.openAPI;
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: text }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
