import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.post('/chat', async (req, res) => {
  const { messages, model = "gpt-3.5-turbo" } = req.body

  if (!messages) {
    return res.status(400).json({ error: 'No messages provided' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model, messages })
    })

    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('❌ Proxy error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/', (req, res) => {
  res.send('✅ OpenAI Proxy is live. Use POST /chat')
})

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`)
})
