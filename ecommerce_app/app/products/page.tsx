"use client";
import ProductsContainer from "@/components/products/products-container";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 border-b border-amber-200 pb-4">Our Collection</h1>
      <ProductsContainer />
    </div>
  );
}

