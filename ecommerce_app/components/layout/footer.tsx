import Link from "next/link"
import { ShoppingBag, Mail, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-amber-50 border-t border-amber-100">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <ShoppingBag className="h-6 w-6 text-amber-500 mr-2" />
              <span className="font-bold text-xl">YeneShop</span>
            </Link>
            <p className="text-gray-600 mb-4">Discover products with us!</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-amber-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-amber-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=men's clothing"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Men&apos;s Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=women's clothing"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Women&apos;s Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=jewelery"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Jewelry
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=electronics"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-amber-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-amber-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-amber-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-amber-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4"></h3>
            <p className="text-gray-600 mb-4">Contact US</p>
            <form className="flex">
              <input
                type="text"
                placeholder="Your message"
                className="min-w-0 flex-1 rounded-l-md border border-r-0 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
              <button
                type="submit"
                className="rounded-r-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Contact Us</span>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-amber-200 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} YeneShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
