"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link"
import { X, ShoppingBag, Home, Package } from "lucide-react"
import { usePathname } from "next/navigation"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  const links = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "Cart", href: "/cart", icon: ShoppingBag },
  ]

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                      <Dialog.Title className="text-lg font-semibold">
                        <div className="flex items-center">
                          <ShoppingBag className="h-6 w-6 text-amber-500 mr-2" />
                          <span>YeneShop</span>
                        </div>
                      </Dialog.Title>
                      <button type="button" className="text-gray-400 hover:text-gray-500 p-2" onClick={onClose}>
                        <span className="sr-only">Close panel</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <nav className="flex flex-col space-y-6">
                        {links.map((link) => {
                          const Icon = link.icon
                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              className={`flex items-center text-lg font-medium ${
                                pathname === link.href ? "text-amber-500" : "text-gray-700"
                              }`}
                              onClick={onClose}
                            >
                              <Icon className="mr-3 h-6 w-6" />
                              {link.name}
                            </Link>
                          )
                        })}
                      </nav>
                    </div>

                    <div className="border-t border-gray-200 px-6 py-6">
                      <div className="flex flex-col space-y-3">
                        <button
                          onClick={onClose}
                          className="flex w-full items-center justify-center rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-600"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
