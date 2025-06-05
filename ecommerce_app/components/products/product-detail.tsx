"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ShoppingBag, Heart, Share2, Minus, Plus } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/slices/cartSlice"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product))
    }
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.title} added to your cart.`,
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="aspect-square bg-white rounded-lg border border-gray-200 p-8">
          <img src={product.image || "/bag.svg"} alt={product.title} className="w-full h-full object-contain" />
        </div>
      </motion.div>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full capitalize">
              {product.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating.rate) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">{product.rating.rate}</span>
              <span className="text-sm text-gray-500">({product.rating.count} reviews)</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-amber-600 mb-6">${product.price.toFixed(2)}</div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center border border-gray-200 rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-50 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-50 transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleAddToCart} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white" size="lg">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          <Button
            onClick={() => setIsWishlisted(!isWishlisted)}
            variant="outline"
            size="lg"
            className={`${isWishlisted ? "text-red-500 border-red-200" : ""}`}
          >
            <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
        </div>
       
      </motion.div>
    </div>
  )
}
