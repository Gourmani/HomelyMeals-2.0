import { createContext, useState } from "react"

export const CartContext = createContext()

function CartProvider({ children }) {

  const [cart, setCart] = useState([])

  const addToCart = (meal) => {

    const existing = cart.find(item => item._id === meal._id)

    if (existing) {
      setCart(
        cart.map(item =>
          item._id === meal._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...meal, quantity: 1 }])
    }

  }

  const increaseQuantity = (_id) => {
    setCart(
      cart.map(item =>
        item._id === _id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (_id) => {
    setCart(
      cart
        .map(item =>
          item._id === _id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeFromCart = (_id) => {
    setCart(cart.filter(item => item._id !== _id))
  }

  // NEW FUNCTION
  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider