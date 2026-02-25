import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

const helvetica = "'Helvetica Neue', Helvetica, Arial, sans-serif"

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const [activeSize, setActiveSize] = useState(product?.variants[0]?.size || '50ml')
  const [showConfirm, setShowConfirm] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400 font-mono text-sm">Not found.</p>
      </div>
    )
  }

  function handleAddToCart() {
    addToCart(product.id, activeSize)
    setShowConfirm(true)
    setTimeout(() => setShowConfirm(false), 2500)
  }

  return (
    <div className="h-full overflow-y-auto bg-bone relative">
      {/* Add to cart confirmation */}
      {showConfirm && (
        <div className="fixed top-20 right-6 z-50 bg-graphite text-white px-6 py-3 font-mono text-xs tracking-wider uppercase fade-in">
          Added to cart — {product.name} ({activeSize})
        </div>
      )}

      <div className="max-w-6xl mx-auto px-8 py-12 lg:py-16">
        {/* Breadcrumb */}
        <div className="font-mono text-xs text-gray-400 mb-12">
          <Link to="/shop" className="hover:text-graphite hover:underline transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            {product.swatch ? (
              <img src={product.swatch} alt={product.name} className="w-80 h-80 md:w-96 md:h-96 object-cover bottle-shadow" />
            ) : (
              <div className="w-80 h-80 md:w-96 md:h-96 flex items-center justify-center" style={{ backgroundColor: product.color }} />
            )}
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2">
            <div className="font-light text-lg text-gray-400 mb-2" style={{ fontFamily: helvetica }}>{product.id.replace('FF-', '')}</div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-3" style={{ fontFamily: helvetica }}>{product.name}</h1>
            <h2 className="text-sm text-gray-400 mb-8 pb-6 border-b border-border-dim">{product.tagline}</h2>

            <div className="space-y-8">
              <div className="space-y-4">
                {product.description.map((para, i) => (
                  <p key={i} className={`text-base leading-relaxed ${
                    i === product.description.length - 1
                      ? 'text-gray-500 italic'
                      : 'text-gray-700'
                  }`} style={{ fontFamily: helvetica }}>{para}</p>
                ))}
              </div>

              <div className="py-6 border-y border-border-dim">
                <span className="font-mono text-[10px] tracking-wider text-gray-400 block mb-4 uppercase">
                  {product.id === 'FF-SET' ? 'Includes' : 'Notes'}
                </span>
                {product.id === 'FF-SET' ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{product.notes.top}</p>
                    <p className="text-sm text-gray-600">{product.notes.middle}</p>
                    <p className="text-sm text-gray-600">{product.notes.base}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">Top</span>
                      <p className="text-sm text-gray-600 mt-0.5">{product.notes.top}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">Middle</span>
                      <p className="text-sm text-gray-600 mt-0.5">{product.notes.middle}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">Base</span>
                      <p className="text-sm text-gray-600 mt-0.5">{product.notes.base}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase UI */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  {product.variants.map(v => (
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
                  Add to Cart — ${product.variants.find(v => v.size === activeSize)?.price}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to collection */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            to="/shop"
            className="font-mono text-xs uppercase tracking-wider text-gray-400 hover:text-graphite hover:underline transition-colors"
          >
            &larr; Back to Collection
          </Link>
        </div>
      </div>
    </div>
  )
}
