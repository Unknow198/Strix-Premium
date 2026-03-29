import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import AnimatedSection from '../components/AnimatedSection.jsx'

const items = [
  { id: 'ea-v1', title: 'EA Auto Trade MT5 V1', image: '/ea-v1.jpg', description: 'Version 1 ' },
  { id: 'ea-v2', title: 'EA Auto Trade MT5 V2', image: '/ea-v2.jpg', description: 'Version 2' },
  { id: 'ea-v3', title: 'EA Auto Trade MT5 V3', image: '/ea-v3.jpg', description: 'Version 3' },
  { id: 'ea-v4', title: 'EA Auto Trade MT5 V4', image: '/ea-v4.jpg', description: 'Version 4 ' },
]

export default function EAMT5Page() {
  return (
    <div>
      <PageHeader
        title="EA MT5 "
        subtitle="ទំព័រ EA MT5 មានការបង្ហាញលម្អិតនៃEA AI Auto Trade របស់យើង ដែលមានចំនួន 4 version ដើម្បីអោយអតិថិជនអាចជ្រើសរើសបានតាមតម្រូវការរបស់ខ្លួន។"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, idx) => (
            <AnimatedSection key={item.id} delay={idx * 0.06}>
              <motion.div whileHover={{ y: -10, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }} className="glass-card overflow-hidden">
                <img src={item.image} alt={item.title} className="h-60 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-leaf-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  <Link to={`/buy-detail/${item.id}`} className="nature-button mt-5">
                    View Detail
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  )
}
