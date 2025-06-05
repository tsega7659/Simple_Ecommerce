"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import {
  fetchProducts,
  fetchCategories,
  setCategory,
  setSearch,
  setSort,
  resetFilters,
} from "@/lib/slices/productsSlice"
import ProductCard from "./product-card"
import ProductsFilter from "./products-filter"
import SortDropdown from "./sort-dropdown"
import { Loader2 } from "lucide-react"

export default function ProductsContainer() {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const { filteredItems, status, error, filters } = useAppSelector((state) => state.products)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
      dispatch(fetchCategories())
    }
  }, [status, dispatch])

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      dispatch(setCategory(category))
    }

    const search = searchParams.get("search")
    if (search) {
      dispatch(setSearch(search))
    }
  }, [searchParams, dispatch])

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="w-full flex items-center justify-center gap-2 py-2 bg-amber-50 border border-amber-100 rounded-md text-amber-800"
        >
          {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      <div className={`lg:w-64 ${mobileFiltersOpen ? "block" : "hidden lg:block"}`}>
        <ProductsFilter />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            <span className="font-medium">{filteredItems.length}</span> products found
          </p>
          <SortDropdown value={filters.sort} onChange={(value) => dispatch(setSort(value))} />
        </div>

        {status === "loading" ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 text-amber-500 animate-spin" />
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : status === "failed" ? (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <button
              onClick={() => dispatch(fetchProducts())}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md"
            >
              Try Again
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg mb-4">No products match your filters</p>
            <button
              onClick={() => dispatch(resetFilters())}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
