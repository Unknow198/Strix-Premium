import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 3001

app.use(express.json({ limit: '20mb' }))

function extractBase64Parts(dataUrl = '') {
  const match = /^data:(.+);base64,(.+)$/.exec(dataUrl)
  if (!match) return { mimeType: 'image/jpeg', base64Data: '' }
  return { mimeType: match[1] || 'image/jpeg', base64Data: match[2] || '' }
}

async function sendTelegramAlert(payload) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return { ok: false, status: 500, error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' }
  }

  const { eaName, duration, totalPayment, customerEmail, exnessEmail, telegramPhone, note, slipBase64, slipName } = payload || {}
  if (!eaName || !duration || !customerEmail || !exnessEmail || !telegramPhone || !totalPayment) {
    return { ok: false, status: 400, error: 'Missing required fields' }
  }

  const time = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Phnom_Penh' })
  const caption = [
    'Strix Premium GP Cambodia',
    `Time: ${time}`,
    `EA Name: ${eaName}`,
    `Duration: ${duration}`,
    `Total Payment: ${totalPayment}`,
    `Email: ${customerEmail}`,
    `Exness Email: ${exnessEmail}`,
    `Telegram +855: ${telegramPhone}`,
    note ? `Note: ${note}` : null,
    slipName ? `Slip: ${slipName}` : null,
  ].filter(Boolean).join('\n')

  if (slipBase64) {
    const { mimeType, base64Data } = extractBase64Parts(slipBase64)
    const buffer = Buffer.from(base64Data, 'base64')
    const formData = new FormData()
    formData.append('chat_id', String(chatId))
    formData.append('caption', caption)
    formData.append('photo', new Blob([buffer], { type: mimeType }), slipName || 'slip.jpg')

    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      body: formData,
    })

    const raw = await tgResponse.text()
    let data = {}
    try { data = raw ? JSON.parse(raw) : {} } catch { return { ok: false, status: 500, error: 'Telegram returned invalid JSON' } }
    if (!tgResponse.ok || data.ok === false) {
      return { ok: false, status: 500, error: data.description || 'Telegram sendPhoto failed' }
    }
    return { ok: true, status: 200 }
  }

  const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: String(chatId), text: caption })
  })

  const raw = await tgResponse.text()
  let data = {}
  try { data = raw ? JSON.parse(raw) : {} } catch { return { ok: false, status: 500, error: 'Telegram returned invalid JSON' } }
  if (!tgResponse.ok || data.ok === false) {
    return { ok: false, status: 500, error: data.description || 'Telegram sendMessage failed' }
  }
  return { ok: true, status: 200 }
}

app.post('/api/telegram-alert', async (req, res) => {
  try {
    const result = await sendTelegramAlert(req.body)
    if (!result.ok) return res.status(result.status).json({ error: result.error })
    return res.status(200).json({ ok: true, message: 'Alert sent to Telegram' })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
