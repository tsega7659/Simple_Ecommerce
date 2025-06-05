import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ProductDetail from "@/components/products/product-detail"
import RelatedProducts from "@/components/products/related-products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(params.id)

    return {
      title: `${product.title} | YeneShop`,
      description: product.description.substring(0, 160),
    }
  } catch (error) {
    return {
      title: "Product Not Found | YeneShop",
      description: "The requested product could not be found.",
    }
  }
}

async function getProduct(id: string) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!response.ok) {
      throw new Error("Product not found")
    }
    return await response.json()
  } catch (error) {
    throw error
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await getProduct(params.id)

    return (
      <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
        <ProductDetail product={product} />
        <RelatedProducts category={product.category} currentProductId={product.id} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}
