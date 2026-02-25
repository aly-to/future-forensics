import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ArchivePage from './pages/ArchivePage'
import ProductPage from './pages/ProductPage'

export default function App() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative bg-bone text-graphite">
      <Header />
      <main className="flex-1 relative overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<Navigate to="/#collection" replace />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/archive" element={<ArchivePage />} />
        </Routes>
      </main>
      <CartDrawer />
    </div>
  )
}
