import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

const fragrances = products.slice(0, 8)

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const idParam = searchParams.get('id')
  const initialIndex = idParam ? Math.max(0, fragrances.findIndex(p => p.id === idParam)) : 0

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [activeSize, setActiveSize] = useState('50ml')
  const [showScroll, setShowScroll] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const collectionRef = useRef(null)

  // Scroll to collection if navigated with hash or from another page
  useEffect(() => {
    if (location.hash === '#collection' || idParam || location.state?.scrollToCollection) {
      const instant = location.state?.instant
      if (instant) {
        collectionRef.current?.scrollIntoView({ behavior: 'instant' })
      } else {
        setTimeout(() => {
          collectionRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location.hash, idParam, location.state])

  // Update selected scent when id param changes
  useEffect(() => {
    if (idParam) {
      const idx = fragrances.findIndex(p => p.id === idParam)
      if (idx !== -1) {
        setCurrentIndex(idx)
        setActiveSize(fragrances[idx].id === 'FF-SET' ? 'One Size' : '50ml')
      }
    }
  }, [idParam])

  const scent = fragrances[currentIndex]

  function selectScent(index) {
    setCurrentIndex(index)
    const p = fragrances[index]
    setActiveSize(p.id === 'FF-SET' ? 'One Size' : '50ml')
  }

  function handleAddToCart() {
    addToCart(scent.id, activeSize)
    setShowConfirm(true)
    setTimeout(() => setShowConfirm(false), 2500)
  }

  function scrollToCollection() {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Show buttons after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  // Show scroll indicator after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowScroll(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full w-full overflow-y-auto">
      {/* Add to cart confirmation */}
      {showConfirm && (
        <div className="fixed top-20 right-6 z-50 bg-graphite text-white px-6 py-3 font-mono text-xs tracking-wider uppercase fade-in">
          Added to cart — {scent.name} ({activeSize})
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <div className="min-h-full relative">
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Navigation buttons — right side */}
        <div className={`absolute right-[23%] z-10 flex gap-4 transition-opacity duration-1000 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ bottom: 'calc(34% - 48px)' }}>
          <a
            href="#collection"
            onClick={(e) => { e.preventDefault(); scrollToCollection(); }}
            className="py-3 px-10 bg-white text-graphite border border-graphite text-sm transition-all hover:bg-gray-50 flex items-center justify-center"
          >
            Explore
          </a>
          <Link
            to="/shop"
            className="py-3 px-10 bg-white text-graphite border border-graphite text-sm transition-all hover:bg-gray-50 flex items-center justify-center"
          >
            Shop All
          </Link>
        </div>

        {/* Scroll indicator — appears after 5s */}
        <button
          onClick={scrollToCollection}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-700 ${
            showScroll ? 'opacity-60 hover:opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-graphite">Scroll</span>
          <svg className="w-4 h-4 animate-bounce text-graphite" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </button>
      </div>

      {/* ===== COLLECTION SECTION ===== */}
      <div ref={collectionRef} id="collection" className="h-screen border-t border-border flex flex-col md:flex-row">
        {/* Left Index */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-border overflow-y-auto bg-bone-light hide-scrollbar shrink-0">
          <div className="p-6 border-b border-border font-mono text-[10px] tracking-wider text-gray-400 sticky top-0 bg-bone-light z-10 uppercase">
            Collection Index
          </div>
          <div className="pt-3">
            {fragrances.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => selectScent(idx)}
                className={`w-full text-left border-b border-border hover:bg-white transition-all duration-200 group relative ${
                  idx === currentIndex
                    ? 'bg-white md:translate-x-3 md:shadow-[4px_0_12px_rgba(0,0,0,0.06)] md:border-l-2 md:border-l-black z-10'
                    : ''
                }`}
              >
                <div className="px-7 py-5">
                  <div className="flex items-baseline gap-5 pr-4">
                    <span className="font-mono text-sm text-gray-400 shrink-0">0{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-medium tracking-wide">{p.name}</div>
                      <div className={`text-[11px] text-gray-400 mt-0.5 transition-opacity ${
                        idx === currentIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        {p.tagline}
                      </div>
                    </div>
                    {p.swatch ? (
                      <img src={p.swatch} alt={p.name} className="w-4 h-4 object-cover shrink-0" />
                    ) : (
                      <div className="w-4 h-4 shrink-0" style={{ backgroundColor: p.color }} />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="w-full text-left border-b border-border hover:opacity-60 transition-opacity group"
          >
            <div className="px-7 py-3">
              <div className="flex items-baseline gap-5 pr-4">
                <span className="font-mono text-sm text-gray-400 shrink-0 invisible">00</span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs uppercase tracking-[0.15em]">View All</span>
                </div>
                <svg
                  className="w-3 h-3 shrink-0 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Right Dossier */}
        <div key={scent.id} className="flex-1 relative overflow-hidden bg-bone flex flex-col h-full fade-in">
          {/* Top Detail Bar */}
          <div className="h-12 border-b border-border-dim flex items-center px-8 justify-between shrink-0">
            <div className="font-mono text-[10px] tracking-wider text-gray-400">{scent.id}</div>
            {scent.swatch ? (
              <img src={scent.swatch} alt={scent.name} className="w-4 h-4 object-cover" />
            ) : (
              <div className="w-4 h-4" style={{ backgroundColor: scent.color }} />
            )}
          </div>

          {/* Main Content Split */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Product Image Area */}
            <div className="w-full lg:w-1/2 relative border-b lg:border-b-0 lg:border-r border-border px-6 lg:px-8 pb-6 lg:pb-8 pt-[5rem] lg:pt-[6.25rem] flex items-start justify-center">
              <div className="w-full aspect-square overflow-hidden relative group">
                {scent.productImage ? (
                  <img src={scent.productImage} alt={scent.name} className={`absolute inset-0 w-full h-full object-cover ${scent.hoverImage ? 'group-hover:opacity-0' : ''} transition-opacity duration-500`} />
                ) : scent.swatch ? (
                  <img src={scent.swatch} alt={scent.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 md:w-80 md:h-80 border border-gray-800 bg-white/50 backdrop-blur-sm bottle-shadow flex items-center justify-center relative">
                      <div className="absolute inset-0 border border-gray-200 m-2" />
                      <div className="w-48 h-48 rounded-full border border-gray-300 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundColor: scent.color }} />
                      </div>
                    </div>
                  </div>
                )}
                {scent.hoverImage && (
                  <img src={scent.hoverImage} alt={scent.name} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </div>
            </div>

            {/* Product Details Area */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto">
              <div className="text-lg font-light text-gray-400 mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{scent.id.replace('FF-', '')}</div>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-3" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{scent.name}</h1>
              <h2 className="text-sm text-gray-400 pb-8">{scent.tagline}</h2>
              <div className="-mx-8 lg:-mx-12 border-b border-border" />

              <div className="pt-8 space-y-4">
                {scent.description.map((para, i) => (
                  <p key={i} className={`text-base leading-relaxed ${
                    i === scent.description.length - 1
                      ? 'text-gray-500 italic'
                      : 'text-gray-700'
                  }`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{para}</p>
                ))}
              </div>

              <div className="pt-8">
                <span className="font-mono text-[10px] tracking-wider text-gray-400 block mb-4 uppercase">
                  Notes
                </span>
                <div className="space-y-3">
                  <div>
                    <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">Top</span>
                    <p className="text-sm text-gray-600 mt-0.5">{scent.notes.top}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">Middle</span>
                    <p className="text-sm text-gray-600 mt-0.5">{scent.notes.middle}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">Base</span>
                    <p className="text-sm text-gray-600 mt-0.5">{scent.notes.base}</p>
                  </div>
                </div>
              </div>
              <div className="pt-8" />
              <div className="-mx-8 lg:-mx-12 border-b border-border" />

              {/* Purchase UI */}
              <div className="pt-8 space-y-4">
                <div className="flex gap-3">
                  {scent.variants.map(v => (
                    <button
                      key={v.size}
                      onClick={() => setActiveSize(v.size)}
                      className={`flex-1 py-3 px-4 border text-sm transition-all ${
                        activeSize === v.size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 text-gray-700 bg-white hover:border-black'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-dark hover:bg-black text-white text-sm tracking-wide transition-colors flex items-center justify-center"
                >
                  Add to Cart — ${scent.variants.find(v => v.size === activeSize)?.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
