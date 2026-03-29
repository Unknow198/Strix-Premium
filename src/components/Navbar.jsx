import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'EA-MT5', href: '/ea-mt5' },
    { label: 'Setting', href: '/setting' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-leaf-50/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <motion.div
            whileHover={{ rotate: -4, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            className="relative shrink-0"
          >
            <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-br from-leaf-300 via-leaf-500 to-earth-400 blur-md opacity-50" />
            <img
              src="/logo.jpg"
              alt="Strix Premium GP Logo"
              className="relative h-12 w-12 rounded-[1.25rem] border border-white/70 object-cover shadow-xl ring-2 ring-white/60 sm:h-14 sm:w-14"
            />
          </motion.div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-wide text-leaf-950 sm:text-base">Strix Premium GP Cambodia</p>
            <p className="truncate text-[11px] text-slate-500 sm:text-xs">ADMIN : JII HOO</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `relative text-sm font-medium transition ${isActive ? 'text-leaf-800' : 'text-slate-700 hover:text-leaf-700'}`}
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}
                  {isActive && <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-leaf-700" />}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/purchase" className="hidden shrink-0 rounded-full bg-leaf-700 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-leaf-800 sm:px-6 sm:py-3 sm:text-sm lg:inline-flex">
            ទិញ EA
          </Link>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-leaf-200 bg-white text-leaf-900 shadow-soft lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 rounded bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`}></span>
              <span className={`h-0.5 w-5 rounded bg-current transition ${open ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-5 rounded bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/50 bg-white/80 px-4 py-3 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-leaf-50 hover:text-leaf-800"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
