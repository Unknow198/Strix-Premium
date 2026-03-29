import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import BackButton from '../components/BackButton.jsx'
import AnimatedSection from '../components/AnimatedSection.jsx'

const items = {
  'ea-v1': { title: 'EA Auto Trade MT5 V1', image: '/ea-v1.jpg', description: 'EA detail សម្រាប់ EA V1' },
  'ea-v2': { title: 'EA Auto Trade MT5 V2', image: '/ea-v2.jpg', description: 'EA detail សម្រាប់ EA V2' },
  'ea-v3': { title: 'EA Auto Trade MT5 V3', image: '/ea-v3.jpg', description: 'EA detail សម្រាប់ EA V3' },
  'ea-v4': { title: 'EA Auto Trade MT5 V4', image: '/ea-v4.jpg', description: 'EA detail សម្រាប់ EA V4' },
}

export default function BuyDetailPage() {
  const { eaId } = useParams()
  const item = items[eaId] || items['ea-v1']

  return (
    <div>
      <PageHeader
        title="EA AI AutoTrade Detail"
        subtitle="លោកអ្នកអាចមើលព័ត៌មានលម្អិតនៃEA AI Auto Trade របស់យើងនៅទីនេះ។ សូមពិនិត្យព័ត៌មាន និងតម្លៃរបស់EA មុនពេលចុចប៊ូតុងទិញ។"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <AnimatedSection>
            <motion.div whileHover={{ scale: 1.01 }} className="glass-card overflow-hidden">
              <img src={item.image} alt={item.title} className="h-full min-h-[340px] w-full object-cover" />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="glass-card p-8 md:p-10">
              <h2 className="text-3xl font-bold text-leaf-900">{item.title}</h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">{item.description}</p>
              <p className="mt-4 text-sm leading-8 text-slate-600">
                
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <BackButton to="/ea-mt5" />
                <Link to={`/purchase?ea=${encodeURIComponent(item.title)}`} className="nature-button">
                  Buy Now
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
