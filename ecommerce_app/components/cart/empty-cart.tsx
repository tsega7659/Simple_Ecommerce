"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-12 w-12 text-amber-500" />
        </div>

        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
        </p>

        <div className="space-y-4">
          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white">
            <Link href="/products">Continue Shopping</Link>
          </Button>

          <div className="text-sm text-gray-500">
            <p>
              Need help?{" "}
              <Link href="#" className="text-amber-600 hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
