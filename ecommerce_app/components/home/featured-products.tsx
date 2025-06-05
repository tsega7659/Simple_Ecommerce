"use client"

import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { fetchProducts } from "@/lib/slices/productsSlice"
import ProductCard from "../products/product-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedProducts() {
  const dispatch = useAppDispatch()
  const { items: products, status, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])
  const featuredProducts = products.slice(0, 4)

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our luxury products that show quality and brand.
          </p>
        </div>

        {status === "loading" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                <Skeleton className="h-64 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : status === "failed" ? (
          <div className="text-center py-10">
            <p className="text-red-500">Error: {error}</p>
            <button
              onClick={() => dispatch(fetchProducts())}
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
