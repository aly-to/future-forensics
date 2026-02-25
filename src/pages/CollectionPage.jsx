import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

const fragrances = products.slice(0, 8)

export default function CollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialIndex = Math.max(0, fragrances.findIndex(p => p.id === searchParams.get('id')))
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [activeSize, setActiveSize] = useState(
    fragrances[initialIndex]?.id === 'FF-SET' ? 'One Size' : '50ml'
  )
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const scent = fragrances[currentIndex]

  function selectScent(index) {
    setCurrentIndex(index)
    const p = fragrances[index]
    setActiveSize(p.id === 'FF-SET' ? 'One Size' : '50ml')
  }

  const currentVariant = scent.variants.find(v => v.size === activeSize) || scent.variants[0]

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Left Index */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-border overflow-y-auto bg-bone-light hide-scrollbar">
        <div className="p-6 border-b border-border font-mono text-[10px] tracking-wider text-gray-400 sticky top-0 bg-bone-light z-10 uppercase">
          Collection Index
        </div>
        {fragrances.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => selectScent(idx)}
            className={`w-full text-left px-6 py-4 border-b border-border hover:bg-white transition-colors group relative ${
              idx === currentIndex ? 'bg-white' : ''
            }`}
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-gray-400">0{idx + 1}</span>
              <div className="flex-1">
                <div className="text-sm font-medium tracking-wide">{p.name}</div>
              </div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            </div>
            <div className="text-[11px] text-gray-400 mt-2 pl-8 opacity-0 group-hover:opacity-100 transition-opacity">
              {p.tagline}
            </div>
          </button>
        ))}
        <button
          onClick={() => navigate('/shop')}
          className="w-full text-left px-6 py-6 border-b border-border hover:bg-dark hover:text-white transition-colors flex justify-between items-center group"
        >
          <span className="text-xs uppercase tracking-[0.15em]">View All</span>
          <svg
            className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {/* Right Dossier */}
      <div key={scent.id} className="flex-1 relative overflow-hidden bg-bone flex flex-col h-full fade-in">
        {/* Top Detail Bar */}
        <div className="h-12 border-b border-border-dim flex items-center px-8 justify-between shrink-0">
          <div className="font-mono text-[10px] tracking-wider text-gray-400">{scent.id}</div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: scent.color }} />
        </div>

        {/* Main Content Split */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Product Image Area */}
          <div className="w-full lg:w-1/2 p-12 flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-border">
            <div className="relative w-64 h-64 md:w-80 md:h-80 border border-gray-800 bg-white/50 backdrop-blur-sm bottle-shadow flex items-center justify-center">
              <div className="absolute inset-0 border border-gray-200 m-2" />
              <div className="w-48 h-48 rounded-full border border-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundColor: scent.color }} />
                <div
                  className="absolute bottom-0 left-0 w-full h-1/2 opacity-30"
                  style={{
                    background: `linear-gradient(to top, ${scent.color}, transparent)`,
                  }}
                />
              </div>
              {/* Label */}
              <div className="absolute bottom-6 left-6 right-6 bg-white border border-gray-200 p-3 font-mono text-[10px] flex justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-sm">{scent.name}</span>
                  <span className="text-gray-500">EAU DE PARFUM</span>
                </div>
                <div className="flex flex-col text-right">
                  <span>{activeSize}</span>
                  <span>VOL. 80%</span>
                </div>
              </div>
              {/* Cap */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-8 bg-black" />
            </div>
          </div>

          {/* Product Details Area */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-3">{scent.name}</h1>
            <h2 className="text-sm text-gray-400 mb-8 pb-6 border-b border-border-dim">{scent.tagline}</h2>

            <div className="space-y-8">
              <p className="text-base leading-loose text-gray-700">{scent.description}</p>

              <div className="py-6 border-y border-border-dim">
                <span className="font-mono text-[10px] tracking-wider text-gray-400 block mb-4 uppercase">
                  Notes
                </span>
                <ul className="space-y-2">
                  {scent.notes.map(note => (
                    <li key={note} className="text-sm text-gray-600">{note}</li>
                  ))}
                </ul>
              </div>

              {/* Purchase UI */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  {scent.variants.map(v => (
                    <button
                      key={v.size}
                      onClick={() => setActiveSize(v.size)}
                      className={`flex-1 py-3 px-4 border text-sm transition-all relative overflow-hidden size-btn ${
                        activeSize === v.size
                          ? 'border-black bg-black text-white'
                          : 'border-border text-gray-600 hover:border-black'
                      }`}
                    >
                      <span className="size-label transition-opacity">{v.size}</span>
                      <span className="size-price absolute inset-0 flex items-center justify-center opacity-0 text-xs transition-opacity">
                        ${v.price}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => addToCart(scent.id, activeSize)}
                  className="w-full py-4 bg-dark hover:bg-black text-white text-sm tracking-wide transition-colors flex items-center justify-center gap-3"
                >
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
