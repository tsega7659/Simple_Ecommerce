"use client"

import { useAppSelector } from "@/lib/hooks"
import CartItem from "./cart-item"
import CartSummary from "./cart-summary"
import EmptyCart from "./empty-cart"

export default function CartContainer() {
  const cartItems = useAppSelector((state) => state.cart.items)

  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  )
}
