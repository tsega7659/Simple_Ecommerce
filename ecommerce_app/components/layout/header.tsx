"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, Search, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"
import MobileMenu from "./mobile-menu"
import SearchDialog from "../products/search-dialog"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const cartItemsCount = useAppSelector((state) => state.cart.items.reduce((count, item) => count + item.quantity, 0))

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-1 md:flex-initial">
              <Link href="/" className="flex items-center">
                <ShoppingBag className="h-6 w-6 text-amber-500 mr-2" />
                <span className="font-bold text-xl">YeneShop</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`text-sm font-medium hover:text-amber-500 transition-colors ${
                  pathname === "/" ? "text-amber-500" : "text-gray-700"
                }`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`text-sm font-medium hover:text-amber-500 transition-colors ${
                  pathname === "/products" ? "text-amber-500" : "text-gray-700"
                }`}
              >
                Products
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-700" />
              </button>

              <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ShoppingBag className="h-5 w-5 text-gray-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 md:hidden rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
