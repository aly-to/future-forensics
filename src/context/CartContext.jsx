import { createContext, useContext, useState, useCallback } from 'react'
import { products } from '../data/products'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addToCart = useCallback((productId, size) => {
    const product = products.find(p => p.id === productId)
    const variant = product.variants.find(v => v.size === size)

    setCart(prev => {
      const existing = prev.find(item => item.id === productId && item.size === size)
      if (existing) {
        return prev.map(item =>
          item.id === productId && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...prev, {
        id: productId,
        name: product.name,
        price: variant.price,
        size,
        color: product.color,
        swatch: product.swatch,
        qty: 1,
      }]
    })

    setIsOpen(true)
  }, [])

  const removeFromCart = useCallback((index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }, [])

  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0)
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <CartContext.Provider value={{
      cart, isOpen, addToCart, removeFromCart, toggleCart, totalQty, subtotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
