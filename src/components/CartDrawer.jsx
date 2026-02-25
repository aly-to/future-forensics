import { useCart } from '../context/CartContext'

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`
}

export default function CartDrawer() {
  const { cart, isOpen, toggleCart, removeFromCart, subtotal } = useCart()

  const threshold = 100
  const percentage = Math.min((subtotal / threshold) * 100, 100)
  const freeShipping = subtotal >= threshold

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-bone border-l border-border z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex justify-between items-center bg-bone">
          <h2 className="font-mono text-lg">REQUISITION LIST</h2>
          <button onClick={toggleCart} className="hover:rotate-90 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Shipping bar */}
        <div className="px-6 py-4 border-b border-border bg-bg-alt">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span>SHIPPING STATUS</span>
            <span className={freeShipping ? 'text-green-700' : ''}>
              {freeShipping
                ? 'FREE INTERNATIONAL SHIPPING UNLOCKED'
                : `$${(threshold - subtotal).toFixed(2)} TO FREE SHIPPING`}
            </span>
          </div>
          <div className="h-1 w-full bg-border relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-black transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20 opacity-50 font-mono text-sm">
              YOUR CART IS EMPTY
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 fade-in">
                <div className="w-20 h-20 border border-gray-300 bg-white flex items-center justify-center shrink-0 relative overflow-hidden">
                  {item.swatch ? (
                    <img src={item.swatch} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-20" style={{ backgroundColor: item.color }} />
                      <div className="w-8 h-8 rounded-full border border-gray-400" />
                    </>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium tracking-tight">{item.name}</h4>
                      <p className="font-mono text-xs text-gray-500">{item.size}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(idx)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-xs">QTY: {item.qty}</span>
                    <span className="font-mono text-sm">${item.price * item.qty}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-bone">
          <div className="flex justify-between font-mono text-sm mb-4">
            <span>SUBTOTAL</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <button className="w-full bg-dark text-bone py-4 hover:bg-black transition-colors flex items-center justify-between px-6 group">
            <span className="font-mono text-sm">PROCEED TO CHECKOUT</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <div className="mt-4 flex justify-center gap-2">
            <div className="h-6 px-2 border border-border flex items-center text-[10px] font-mono text-gray-500">
              SHOPIFY SECURE
            </div>
            <div className="h-6 px-2 border border-border flex items-center text-[10px] font-mono text-gray-500">
              SHOP PAY
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
