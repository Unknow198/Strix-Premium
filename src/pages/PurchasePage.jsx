import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import BackButton from '../components/BackButton.jsx'
import AnimatedSection from '../components/AnimatedSection.jsx'

const pricing = {
  'EA Auto Trade MT5 V1': { '1 ខែ': 30, '3 ខែ': null, '6 ខែ': 85, '1 ជីវិត': 300 },
  'EA Auto Trade MT5 V2': { '1 ខែ': 20, '3 ខែ': null, '6 ខែ': 65, '1 ជីវិត': 200 },
  'EA Auto Trade MT5 V3': { '1 ខែ': 49, '3 ខែ': null, '6 ខែ': 99, '1 ជីវិត': 399 },
  'EA Auto Trade MT5 V4': { '1 ខែ': 49, '3 ខែ': 99, '6 ខែ': 199, '1 ជីវិត': 399 },
}

const durations = ['1 ខែ', '3 ខែ', '6 ខែ', '1 ជីវិត']
const eaOptions = Object.keys(pricing)

export default function PurchasePage() {
  const [searchParams] = useSearchParams()
  const initialEA = searchParams.get('ea') || eaOptions[0]

  const [form, setForm] = useState({
    eaName: eaOptions.includes(initialEA) ? initialEA : eaOptions[0],
    duration: '1 ខែ',
    customerEmail: '',
    exnessEmail: '',
    telegramPhone: '',
    note: '',
  })
  const [slipBase64, setSlipBase64] = useState('')
  const [slipName, setSlipName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('strix_order_history')
      if (saved) setHistory(JSON.parse(saved))
    } catch {
      setHistory([])
    }
  }, [])

  useEffect(() => {
    const currentPricing = pricing[form.eaName]
    if (currentPricing?.[form.duration] == null) {
      const firstAvailable = durations.find((item) => currentPricing?.[item] != null) || '1 ខែ'
      setForm((prev) => ({ ...prev, duration: firstAvailable }))
    }
  }, [form.eaName])

  const selectedPrice = useMemo(() => pricing[form.eaName]?.[form.duration] ?? null, [form.eaName, form.duration])
  const previewLabel = useMemo(() => slipName ? `បានជ្រើសរើស: ${slipName}` : 'មិនទាន់មានរូបភាព', [slipName])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSlipName(file.name)
    const base64 = await fileToBase64(file)
    setSlipBase64(base64)
  }

  const saveHistory = (item) => {
    const current = JSON.parse(localStorage.getItem('strix_order_history') || '[]')
    const updated = [item, ...current].slice(0, 10)
    localStorage.setItem('strix_order_history', JSON.stringify(updated))
    setHistory(updated)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (selectedPrice == null) throw new Error('Duration នេះមិនមានតម្លៃសម្រាប់ EA នេះទេ')

      const payload = {
        ...form,
        totalPayment: `$${selectedPrice}`,
        slipBase64,
        slipName,
      }

      const response = await fetch('/api/telegram-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const raw = await response.text()
      let data = {}
      try { data = raw ? JSON.parse(raw) : {} } catch { throw new Error('API returned invalid JSON') }
      if (!response.ok) throw new Error(data?.error || 'Submit failed')

      const time = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Phnom_Penh' })
      saveHistory({
        time,
        eaName: form.eaName,
        duration: form.duration,
        totalPayment: `$${selectedPrice}`,
        customerEmail: form.customerEmail,
        exnessEmail: form.exnessEmail,
        telegramPhone: form.telegramPhone,
        slipName: slipName || '-',
      })

      setMessage('Thank you for your purchase! Our team will contact you soon via Telegram.')
      setForm((prev) => ({ ...prev, customerEmail: '', exnessEmail: '', telegramPhone: '', note: '' }))
      setSlipBase64('')
      setSlipName('')
      event.target.reset()
    } catch (error) {
      setMessage(error.message || 'Submit failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Payment & Purchase"
        subtitle="សូមពិនិត្យព័ត៌មាន និងតម្លៃរបស់EA មុនពេលចុចប៊ូតុងទិញ។"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <AnimatedSection>
            <div className="glass-card p-6 md:p-8">
              <div className="rounded-5xl bg-gradient-to-br from-leaf-100 via-white to-earth-100 p-6">
                <img src="/qr-aba.jpg" alt="ABA QR" className="mx-auto h-82 w-full max-w-md rounded-5xl border border-leaf-200 object-cover bg-white shadow-glow" />
                <div className="mt-6 rounded-4xl bg-white p-5 text-sm leading-7 text-slate-600 shadow-soft">
                  <p><span className="font-bold text-leaf-900">ABA NAME:</span> SEREYVATH PHAT</p>
                  <p className="mt-3">- ចំណាំ បន្ទាប់ពីការទិញមិនអាចបដិសេធវិញបានទេ</p>
                  <p>- សូមពិនិត្យ EA អោយបានច្បាស់លាស់</p>
                  <p>- ការទិញស្ថិតក្រោមរយៈពេល 24 ម៉ោង រាប់ចាប់ពីពេល Submit</p>
                  <p>- បន្ទាប់ពីទិញរួច ក្រុមការងារនឹងផ្ញើ File ទៅកាន់ Email និង Telegram ដែលលោកអ្នកបានដាក់</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="label">ឈ្មោះ EA AI ដែល User បានជ្រើសរើស</label>
                  <select name="eaName" value={form.eaName} onChange={handleChange} className="input">
                    {eaOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="label">ជ្រើសរើសចំនួនខែ / រយៈពេល</label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {durations.map((duration) => {
                      const price = pricing[form.eaName]?.[duration]
                      const disabled = price == null
                      const active = form.duration === duration && !disabled
                      return (
                        <button
                          key={duration}
                          type="button"
                          disabled={disabled}
                          onClick={() => !disabled && setForm((prev) => ({ ...prev, duration }))}
                          className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                            disabled ? 'price-chip-disabled' : active ? 'price-chip-active' : 'border-leaf-200 bg-white text-leaf-900 hover:-translate-y-0.5 hover:border-leaf-500'
                          }`}
                        >
                          <div>{duration}</div>
                          <div className="mt-1 text-xs opacity-90">{price == null ? 'N/A' : `$${price}`}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="md:col-span-2 rounded-4xl border border-leaf-100 bg-gradient-to-r from-leaf-50 to-earth-50 p-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-leaf-900">Price List</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {durations.map((duration) => {
                          const price = pricing[form.eaName]?.[duration]
                          return (
                            <li key={duration} className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-2">
                              <span>{duration}</span>
                              <span className="font-semibold text-leaf-800">{price == null ? 'N/A' : `$${price}`}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    <motion.div
                      key={`${form.eaName}-${form.duration}-${selectedPrice}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.28 }}
                      className="rounded-4xl bg-leaf-900 p-6 text-white shadow-premium"
                    >
                      <p className="text-sm uppercase tracking-[0.25em] text-white/70">Total Payment</p>
                      <p className="mt-3 text-4xl font-black">{selectedPrice == null ? 'N/A' : `$${selectedPrice}`}</p>
                      <p className="mt-3 text-sm text-white/70">{form.eaName}</p>
                      <p className="mt-1 text-sm text-white/70">{form.duration}</p>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <label className="label">Email</label>
                  <input required type="email" name="customerEmail" value={form.customerEmail} onChange={handleChange} className="input" placeholder="your@email.com" />
                </div>

                <div>
                  <label className="label">Exness Email</label>
                  <input required type="email" name="exnessEmail" value={form.exnessEmail} onChange={handleChange} className="input" placeholder="exness@email.com" />
                </div>

                <div>
                  <label className="label">Telegram +855</label>
                  <input required type="text" name="telegramPhone" value={form.telegramPhone} onChange={handleChange} className="input" placeholder="+855 12 345 678" />
                </div>

                <div>
                  <label className="label">រូបថត slip បង់ប្រាក់</label>
                  <input required type="file" accept="image/*" onChange={handleFileChange} className="input file:mr-4 file:rounded-full file:border-0 file:bg-leaf-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
                  <p className="mt-2 text-xs text-slate-500">{previewLabel}</p>
                </div>

                <div className="md:col-span-2">
                  <label className="label">ចំណាំបន្ថែម</label>
                  <textarea name="note" rows="4" value={form.note} onChange={handleChange} className="input resize-none" placeholder="សរសេរចំណាំបន្ថែម..." />
                </div>

                <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button type="submit" disabled={loading || selectedPrice == null} className="nature-button disabled:cursor-not-allowed disabled:opacity-60">
                    {loading ? 'កំពុងផ្ញើ...' : 'SUBMIT'}
                  </button>
                  <span className="text-sm text-slate-600">{message}</span>
                </div>
              </div>
            </form>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.12} className="mt-10">
          <div className="glass-card overflow-hidden">
            <div className="border-b border-leaf-100 px-6 py-4">
              <h3 className="text-xl font-bold text-leaf-900">Saved Submission History</h3>
              <p className="mt-1 text-sm text-slate-600">រក្សាទុកនៅក្នុង browser របស់អ្នក។</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-leaf-50 text-leaf-900">
                  <tr>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">EA</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Slip</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length === 0 ? (
                    <tr>
                      <td className="px-6 py-6 text-slate-500" colSpan="6">មិនទាន់មានប្រវត្តិ</td>
                    </tr>
                  ) : (
                    history.map((item, index) => (
                      <tr key={index} className="border-t border-leaf-100">
                        <td className="px-6 py-4">{item.time}</td>
                        <td className="px-6 py-4">{item.eaName}</td>
                        <td className="px-6 py-4">{item.duration}</td>
                        <td className="px-6 py-4">{item.totalPayment}</td>
                        <td className="px-6 py-4">{item.customerEmail}</td>
                        <td className="px-6 py-4">{item.slipName}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
