import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Preloader from './components/Preloader.jsx'
import HomePage from './pages/HomePage.jsx'
import EAMT5Page from './pages/EAMT5Page.jsx'
import SettingPage from './pages/SettingPage.jsx'
import BuyDetailPage from './pages/BuyDetailPage.jsx'
import PurchasePage from './pages/PurchasePage.jsx'
import ContactPage from './pages/ContactPage.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Preloader visible={loading} />
      <div className="min-h-screen bg-[linear-gradient(180deg,#f4f8f2_0%,#fbfaf6_100%)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ea-mt5" element={<EAMT5Page />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/buy-detail/:eaId" element={<BuyDetailPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}
