"use client"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { updateQuantity, removeFromCart } from "@/lib/slices/cartSlice"
import type { CartItem as CartItemType } from "@/lib/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
    toast({
      title: "Item removed",
      description: `${item.title} has been removed from your cart.`,
    })
  }

  return (
    <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg">
      <Link href={`/products/${item.id}`} className="flex-shrink-0">
        <img
          src={item.image || "/bag.svg"}
          alt={item.title}
          className="w-20 h-20 object-contain rounded-md border border-gray-200"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.id}`} className="block">
          <h3 className="font-medium text-gray-900 hover:text-amber-600 transition-colors line-clamp-2">
            {item.title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-amber-600">${(item.price * item.quantity).toFixed(2)}</span>
            <Button
              onClick={handleRemove}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
