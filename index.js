{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import express from 'express'\
import cors from 'cors'\
import dotenv from 'dotenv'\
import fetch from 'node-fetch'\
\
dotenv.config()\
\
const app = express()\
const port = process.env.PORT || 3000\
\
app.use(cors())\
app.use(express.json())\
\
app.post('/chat', async (req, res) => \{\
  const \{ messages, model = "gpt-3.5-turbo" \} = req.body\
\
  if (!messages) \{\
    return res.status(400).json(\{ error: 'No messages provided' \})\
  \}\
\
  try \{\
    const response = await fetch('https://api.openai.com/v1/chat/completions', \{\
      method: 'POST',\
      headers: \{\
        'Authorization': `Bearer $\{process.env.OPENAI_API_KEY\}`,\
        'Content-Type': 'application/json'\
      \},\
      body: JSON.stringify(\{ model, messages \})\
    \})\
\
    const data = await response.json()\
    res.json(data)\
  \} catch (error) \{\
    console.error('\uc0\u10060  Proxy error:', error)\
    res.status(500).json(\{ error: 'Internal server error' \})\
  \}\
\})\
\
app.get('/', (req, res) => \{\
  res.send('\uc0\u9989  OpenAI Proxy is live. Use POST /chat')\
\})\
\
app.listen(port, () => \{\
  console.log(`\uc0\u9989  Server running on port $\{port\}`)\
\})\
}