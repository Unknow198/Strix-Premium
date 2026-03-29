export const config = {
  api: { bodyParser: { sizeLimit: '20mb' } }
}

function b64ToUint8Array(base64) {
  const binary = atob(base64)
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i += 1) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function extractBase64Parts(dataUrl = '') {
  const match = /^data:(.+);base64,(.+)$/.exec(dataUrl)
  if (!match) return { mimeType: 'image/jpeg', base64Data: '' }
  return { mimeType: match[1] || 'image/jpeg', base64Data: match[2] || '' }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (!token || !chatId) return res.status(500).json({ error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' })

    const { eaName, duration, totalPayment, customerEmail, exnessEmail, telegramPhone, note, slipBase64, slipName } = req.body || {}
    if (!eaName || !duration || !customerEmail || !exnessEmail || !telegramPhone || !totalPayment) {
      return res.status(400).json({ error: 'Missing required fields' })
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

    let tgResponse
    if (slipBase64) {
      const { mimeType, base64Data } = extractBase64Parts(slipBase64)
      const bytes = b64ToUint8Array(base64Data)
      const formData = new FormData()
      formData.append('chat_id', String(chatId))
      formData.append('caption', caption)
      formData.append('photo', new Blob([bytes], { type: mimeType }), slipName || 'slip.jpg')
      tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, { method: 'POST', body: formData })
    } else {
      tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: String(chatId), text: caption })
      })
    }

    const raw = await tgResponse.text()
    let data = {}
    try { data = raw ? JSON.parse(raw) : {} } catch { return res.status(500).json({ error: 'Telegram returned invalid JSON' }) }
    if (!tgResponse.ok || data.ok === false) return res.status(500).json({ error: data.description || 'Telegram request failed' })

    return res.status(200).json({ ok: true, message: 'Alert sent to Telegram' })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
