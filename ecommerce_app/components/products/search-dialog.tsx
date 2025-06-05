"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Search, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useAppSelector } from "@/lib/hooks"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const { items: products } = useAppSelector((state) => state.products)

  const filteredProducts =
    query === ""
      ? []
      : products
          .filter(
            (product) =>
              product.title.toLowerCase().includes(query.toLowerCase()) ||
              product.description.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 5)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onOpenChange(false)
      router.push(`/products?search=${encodeURIComponent(query)}`)
    }
  }
  useEffect(() => {
    if (!open) {
      setQuery("")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
        <div className="p-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </form>
        </div>

        {query && (
          <div className="border-t border-gray-200 max-h-[60vh] overflow-y-auto">
            {filteredProducts.length > 0 ? (
              <div>
                <div className="p-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase mb-3">Products</h3>
                  <div className="space-y-3">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={() => onOpenChange(false)}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          className="w-12 h-12 object-contain rounded-md border border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{product.title}</p>
                          <p className="text-amber-600 font-semibold">${product.price.toFixed(2)}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4">
                  <button
                    onClick={handleSearch}
                    className="w-full text-left text-amber-600 hover:text-amber-700 font-medium"
                  >
                    View all results for "{query}"
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No products found for "{query}"</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
