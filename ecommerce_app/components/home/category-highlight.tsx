"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { fetchCategories } from "@/lib/slices/productsSlice"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

const categoryIcons: Record<string, string> = {
  electronics: "💻",
  jewelery: "💍",
  "men's clothing": "👔",
  "women's clothing": "👗",
}

export default function CategoryHighlight() {
  const dispatch = useAppDispatch()
  const { categories, status } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories())
    }
  }, [categories, dispatch])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-16  bg-amber-500 text-whit">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our categories to find exactly what you're looking for.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-32 rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {categories.map((category) => (
              <motion.div key={category} variants={item}>
                <Link
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="category-button block bg-white border border-amber-200 rounded-lg p-6 text-center hover:shadow-md transition-all hover:border-amber-300"
                >
                  <div className="text-4xl mb-3">{categoryIcons[category] || "🛍️"}</div>
                  <h3 className="font-semibold text-lg capitalize">{category}</h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
