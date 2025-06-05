import type { Metadata } from "next"
import HeroSection from "@/components/home/hero-section"
import FeaturedProducts from "@/components/home/featured-products"
import CategoryHighlight from "@/components/home/category-highlight"
import "./globals.css"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Build Your Lifestyle with us!",
  description: "Discover our luxury picks and shine with effortless style.",
}

export default async function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <CategoryHighlight />
    </div>
  )
}
