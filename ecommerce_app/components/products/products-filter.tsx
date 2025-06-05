"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setCategory, setPriceRange, resetFilters } from "@/lib/slices/productsSlice"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function ProductsFilter() {
  const dispatch = useAppDispatch()
  const { categories, filters } = useAppSelector((state) => state.products)
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange)

  const handleCategoryClick = (category: string | null) => {
    dispatch(setCategory(category))
  }

  const handlePriceChange = (values: number[]) => {
    setLocalPriceRange([values[0], values[1]])
  }

  const handlePriceChangeCommitted = () => {
    dispatch(setPriceRange([localPriceRange[0], localPriceRange[1]]))
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>
      <div className="mb-6">
        <h4 className="font-medium text-sm uppercase text-gray-500 mb-3">Category</h4>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`w-full text-left px-2 py-1 rounded-sm transition-colors ${
                filters.category === null ? "bg-amber-100 text-amber-800" : "hover:bg-gray-100"
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryClick(category)}
                className={`w-full text-left px-2 py-1 rounded-sm transition-colors capitalize ${
                  filters.category === category ? "bg-amber-100 text-amber-800" : "hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Separator className="my-4" />
      <div className="mb-6">
        <h4 className="font-medium text-sm uppercase text-gray-500 mb-4">Price Range</h4>
        <div className="px-2">
          <Slider
            defaultValue={[localPriceRange[0], localPriceRange[1]]}
            min={0}
            max={1000}
            step={1}
            value={[localPriceRange[0], localPriceRange[1]]}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceChangeCommitted}
            className="price-slider"
          />
          <div className="flex items-center justify-between mt-2 text-sm">
            <span>${localPriceRange[0]}</span>
            <span>${localPriceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator className="my-4" />
      <Button onClick={() => dispatch(resetFilters())} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  )
}
