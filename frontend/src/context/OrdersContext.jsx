import { createContext, useState } from "react"

export const OrdersContext = createContext()

function OrdersProvider({ children }) {

  const [orders, setOrders] = useState([])

  const placeOrder = (order) => {
    setOrders([...orders, order])
  }

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  )
}

export default OrdersProvider