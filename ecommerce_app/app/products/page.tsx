import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsContainer from "@/components/products/products-container";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "YeneShop - Our Collection",
  description: "Browse our complete collection of products.",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 border-b border-amber-200 pb-4">Our Collection</h1>
      <Suspense fallback={<div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 text-amber-500 animate-spin" />
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>}>
        <ProductsContainer />
      </Suspense>
    </div>
  );
}