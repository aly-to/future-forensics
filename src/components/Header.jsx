import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { totalQty, toggleCart } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleCollectionClick(e) {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollToCollection: true, instant: true } })
    }
  }

  return (
    <header className="border-b border-border bg-bone z-50 shrink-0">
      <div className="h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-bold tracking-tighter hover:opacity-60 transition-opacity"
          >
            FUTURE FORENSICS
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-mono">
            <button
              onClick={handleCollectionClick}
              className="relative pb-1 group"
            >
              COLLECTION
              <span className="absolute bottom-0 left-0 w-full h-px bg-graphite scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
            <Link
              to="/shop"
              className="relative pb-1 group"
            >
              SHOP ALL
              <span className="absolute bottom-0 left-0 w-full h-px bg-graphite scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
            <Link
              to="/archive"
              className="relative pb-1 group"
            >
              ABOUT
              <span className="absolute bottom-0 left-0 w-full h-px bg-graphite scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden md:block text-xs font-mono text-gray-500">
            STATUS: ONLINE
          </div>
          <button onClick={toggleCart} className="relative group">
            <span className="font-mono text-sm">
              CART (<span>{totalQty}</span>)
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden font-mono text-sm"
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border">
          <button
            onClick={handleCollectionClick}
            className="w-full text-left px-6 py-4 font-mono text-sm border-b border-border hover:bg-white transition-colors"
          >
            COLLECTION
          </button>
          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-4 font-mono text-sm border-b border-border hover:bg-white transition-colors"
          >
            SHOP ALL
          </Link>
          <Link
            to="/archive"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-4 font-mono text-sm border-b border-border hover:bg-white transition-colors"
          >
            ABOUT
          </Link>
        </nav>
      )}
    </header>
  )
}
