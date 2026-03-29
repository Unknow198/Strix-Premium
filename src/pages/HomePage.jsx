import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import AnimatedSection from '../components/AnimatedSection.jsx'
import CountUp from '../components/CountUp.jsx'

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -90])
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <div>
      <PageHeader
        title="Home Page"
        subtitle="សូមស្វាគមន៍មកកាន់ Strix Premium GP Cambodia - អ្នកអាចរកបាន EA AI Auto Trade សម្រាប់ MT5 ដែលមានគុណភាពខ្ពស់ និងងាយប្រើ"
      />

      <section ref={heroRef} className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_top_left,_rgba(121,167,93,0.2),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(200,143,85,0.18),_transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0.35))]" />
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div style={{ y: yText }} className="flex flex-col justify-center py-6">
            <span className="mb-4 inline-flex w-fit rounded-full border border-leaf-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-leaf-700 shadow-glow">
              Community Strix Premium GP
            </span>
            <h2 className="text-4xl font-black leading-tight text-leaf-900 md:text-6xl">
              EA AI Auto Trade សម្រាប់ MT5
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
              Website នេះគឺជាស្នាត់ដៃរបស់យើងក្នុងការផ្តល់ជូននូវភាពងាយស្រួលក្នុងការទិញEA AI របស់យើង យើងមានបទពិសោធន៍ និងការផ្តល់ជូននូវEA AI ដែលអាចជួយអ្នកក្នុងការជួញដូរមាស និងបង្កើតប្រាក់ចំណេញបានយ៉ាងមានប្រសិទ្ធភាព។
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/ea-mt5" className="nature-button">ចូល EA MT5</Link>
              <Link to="/contact" className="nature-button-secondary">Contact Page</Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="nature-card p-4 text-center">
                <p className="text-3xl font-black text-leaf-800"><CountUp end={4} /></p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">EA Versions</p>
              </div>
              <div className="nature-card p-4 text-center">
                <p className="text-3xl font-black text-leaf-800"><CountUp end={24} suffix="h" /></p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Delivery Window</p>
              </div>
              <div className="nature-card p-4 text-center">
                <p className="text-3xl font-black text-leaf-800"><CountUp end={100} suffix="%" /></p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Responsive</p>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: yImage }}>
            <div className="glass-card overflow-hidden p-4">
              <div className="rounded-5xl bg-gradient-to-br from-leaf-200 via-white to-earth-100 p-4 md:p-6">
                <div className="rounded-5xl border border-white/70 bg-white/80 p-6">
                  <div className="mb-6 flex items-center gap-4">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative"
                    >
                      <div className="absolute inset-0 rounded-3xl bg-green-400 blur-md opacity-40"></div>
                      <img src="/profile.jpg" alt="profile" className="relative h-17 w-16 rounded-3xl object-cover shadow-xl" />
                    </motion.div>
                    <div>
                      <p className="text-2xl font-bold text-leaf-900">Strix Premium GP Cambodia</p>
                      <p className="text-sm text-slate-500">ADMIN : JII HOO</p>
                    </div>
                  </div>
                  <img src="/profile.jpg" alt="profile showcase" className="h-80 w-full rounded-5xl object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['More Information', 'បង្កើតប្រតិបត្តិការទិញដែលមានប្រសិទ្ធភាព និងងាយស្រួល ដើម្បីអោយអតិថិជនអាចទិញEA AI របស់យើងបានយ៉ាងរហ័ស និងងាយស្រួល។'],
            ['Group Community', 'សហគមន៍ដែលមានសកម្មភាពខ្ពស់ ដើម្បីអោយអតិថិជនអាចចែករំលែកបទពិសោធន៍ ដែលមានប្រសិទ្ធភាព និងទទួលបានការគាំទ្រពីសមាជិកផ្សេងទៀត។'],
            ['Web Features', 'EA AI Auto Tradeរបស់យើងមានការUpdateជារាងរាល់ខែ នឹងមានតម្ឡៃពិសេសសម្រាប់អតិថិជនដែលបានទិញEA AIរបស់យើង។'],
          ].map((item, idx) => (
            <AnimatedSection key={item[0]} delay={idx * 0.08}>
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-leaf-900">{item[0]}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item[1]}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  )
}
