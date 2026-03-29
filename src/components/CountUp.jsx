import { useEffect, useState } from 'react'

export default function CountUp({ end, suffix = '', duration = 1200 }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start = 0
    const startTime = performance.now()

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start + (end - start) * eased)
      setValue(current)
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [end, duration])

  return <span>{value}{suffix}</span>
}
