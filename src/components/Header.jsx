import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { totalQty, toggleCart } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  function handleCollectionClick(e) {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollToCollection: true, instant: true } })
    }
  }

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-bone z-50 shrink-0">
      <div className="flex items-center gap-8">
        <Link
          to="/"
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
      <div className="flex items-center gap-6">
        <div className="hidden md:block text-xs font-mono text-gray-500">
          STATUS: ONLINE
        </div>
        <button onClick={toggleCart} className="relative group">
          <span className="font-mono text-sm">
            CART (<span>{totalQty}</span>)
          </span>
          <div className="absolute -bottom-1 left-0 w-full h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </button>
      </div>
    </header>
  )
}
