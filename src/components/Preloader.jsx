import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[linear-gradient(180deg,#f4f8f2_0%,#eef5e9_100%)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, ease: 'linear', repeat: Infinity }}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-leaf-500 to-earth-400 shadow-premium"
            >
              <span className="text-4xl font-black text-white">S</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-5 text-sm font-semibold tracking-[0.35em] text-leaf-800"
            >
              STRIX PREMIUM GP
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
