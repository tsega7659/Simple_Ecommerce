"use client"
import CartContainer from "@/components/cart/cart-container"

export default function CartPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 border-b border-amber-200 pb-4">Your Cart</h1>
      <CartContainer />
    </div>
  )
}
