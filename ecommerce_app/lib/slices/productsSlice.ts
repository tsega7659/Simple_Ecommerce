import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"

interface ProductsState {
  items: Product[]
  filteredItems: Product[]
  categories: string[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  filters: {
    category: string | null
    search: string
    priceRange: [number, number]
    sort: "default" | "price-low" | "price-high" | "name-asc" | "name-desc"
  }
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  categories: [],
  status: "idle",
  error: null,
  filters: {
    category: null,
    search: "",
    priceRange: [0, 1000],
    sort: "default",
  },
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products")
  const data = await response.json()
  return data
})

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await fetch("https://fakestoreapi.com/products/categories")
  const data = await response.json()
  return data
})

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.filters.category = action.payload
      applyFilters(state)
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      applyFilters(state)
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload
      applyFilters(state)
    },
    setSort: (state, action: PayloadAction<ProductsState["filters"]["sort"]>) => {
      state.filters.sort = action.payload
      applyFilters(state)
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
      applyFilters(state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded"
        state.items = action.payload
        state.filteredItems = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch products"
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload
      })
  },
})
function applyFilters(state: ProductsState) {
  let result = [...state.items]
  if (state.filters.category) {
    result = result.filter((product) => product.category === state.filters.category)
  }

  if (state.filters.search) {
    const searchLower = state.filters.search.toLowerCase()
    result = result.filter(
      (product) =>
        product.title.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower),
    )
  }
  const [min, max] = state.filters.priceRange
  result = result.filter((product) => product.price >= min && product.price <= max)

  switch (state.filters.sort) {
    case "price-low":
      result.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      result.sort((a, b) => b.price - a.price)
      break
    case "name-asc":
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "name-desc":
      result.sort((a, b) => b.title.localeCompare(a.title))
      break
  }

  state.filteredItems = result
}

export const { setCategory, setSearch, setPriceRange, setSort, resetFilters } = productsSlice.actions

export default productsSlice.reducer
