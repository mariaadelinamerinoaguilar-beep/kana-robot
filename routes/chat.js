const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
});

router.post('/', async (req, res) => {
  try {
    const { mensaje } = req.body;
    
    if (!mensaje) {
      return res.status(400).json({ error: 'Falta el mensaje' });
    }

    const completion = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: 'Eres Kana, un robot de escritorio amigable y divertido. Responde con frases cortas y con emojis. Máximo 30 palabras.' },
        { role: 'user', content: mensaje }
      ],
      max_tokens: 100
    });

    const respuesta = completion.choices[0].message.content;
    res.json({ respuesta });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
