"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Star } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/slices/cartSlice"
import type { Product } from "@/types"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addToCart(product))
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  return (
    <motion.div
      className="group product-card-hover bg-white rounded-lg border border-gray-200 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden pt-[100%]">
          <img
            src={product.image || "/bag.svg"}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-contain p-6 transition-transform duration-500 transform group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 bg-black/5 transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating.rate}</span>
            <span className="text-xs text-gray-500">({product.rating.count})</span>
          </div>

          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.title}</h3>

          <p className="text-amber-600 font-bold mb-3">${product.price.toFixed(2)}</p>

          <div className="absolute bottom-4 right-4 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition-colors"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
