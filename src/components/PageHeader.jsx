import { motion } from 'framer-motion'

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="glass-card relative overflow-hidden p-8 md:p-10"
      >
        <div className="mesh-bg absolute inset-0 opacity-60" />
        <div className="relative">
          <h1 className="section-title">{title}</h1>
          <p className="section-subtitle">{subtitle}</p>
        </div>
      </motion.div>
    </section>
  )
}
