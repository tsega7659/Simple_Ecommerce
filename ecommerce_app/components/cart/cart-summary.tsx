"use client"

import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { clearCart } from "@/lib/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export default function CartSummary() {
  const cartItems = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Checkout initiated",
      description: "Redirecting to payment...",
    })

    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      })
    }, 2000)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal ({cartItems.reduce((count, item) => count + item.quantity, 0)} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="text-amber-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {subtotal < 50 && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>
        </div>
      )}

      <Button onClick={handleCheckout} className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white" size="lg">
        Proceed to Checkout
      </Button>
    </div>
  )
}
