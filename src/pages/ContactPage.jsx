import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import BackButton from '../components/BackButton.jsx'
import AnimatedSection from '../components/AnimatedSection.jsx'

const links = {
  admin: 'https://t.me/akudaforex87',
  group: 'https://t.me/+yP45vQTarhxiNWI1',
  tiktok: 'https://www.tiktok.com/@vathgod0',
}

function Card({ title, text, href, delay }) {
  return (
    <AnimatedSection delay={delay}>
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -8, scale: 1.01 }}
        className="glass-card block p-6 transition"
      >
        <div className="mb-4 h-12 w-12 rounded-2xl bg-leaf-100" />
        <h3 className="text-lg font-bold text-leaf-900">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
      </motion.a>
    </AnimatedSection>
  )
}

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Contact Page"
        subtitle="ទំព័រ Contact ត្រូវបានកែលម្អដោយ hover animation និង glass effect style។"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Card title="Telegram Admin" text="ទំនាក់ទំនងទៅកាន់ Telegram Admin ផ្ទាល់។" href={links.admin} delay={0.04} />
          <Card title="Telegram Group" text="ចូលរួមក្រុម Telegram សម្រាប់ព័ត៌មានថ្មីៗ។" href={links.group} delay={0.1} />
          <Card title="TikTok Account" text="ទស្សនាវីដេអូ និង content ផ្សព្វផ្សាយ។" href={links.tiktok} delay={0.16} />
        </div>
      </section>
    </div>
  )
}
