"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image";



export default function HeroSection() {
  return (
    <section className="relative bg-amber-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 z-10">
          
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Build Your <span className="text-amber-500">Lifestyle</span> with us!
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our luxury picks and shine with effortless style.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/products"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-md font-medium flex items-center transition-colors"
            >
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#featured"
              className="bg-white border border-amber-200 hover:bg-amber-50 text-amber-800 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Explore Featured
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="mt-10 md:mt-0 md:w-1/2 flex justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -left-6 -top-6 w-32 h-32 bg-amber-200  opacity-50 blur-xl"></div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-amber-300  opacity-40 blur-xl"></div>
          <Image
            src="/hero.svg"
            alt="Luxury Products Showcase"
            width={500} 
            height={500} 
            className=" relative z-10"
          />
          </div>
        </motion.div>
      </div>
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/3 right-10 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    </section>
  )
}
