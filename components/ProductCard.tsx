'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  salePrice?: number | null
  images: string[]
  sku: string
  stock: number
  featured: boolean
  category?: {
    name: string
    slug: string
  }
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.stock <= 0) {
      toast.error('Product is out of stock')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0] || '/placeholder-product.jpg',
      sku: product.sku,
    })

    toast.success('Added to cart!')
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const displayPrice = product.salePrice || product.price
  const originalPrice = product.salePrice ? product.price : null
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : 0

  return (
    <div 
      className="card-tech rounded-lg overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-square bg-slate-800/30 overflow-hidden">
          {/* Sale Badge */}
          {product.salePrice && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{discountPercentage}%
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 right-3 z-10">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
            </div>
          )}

          {/* Product Image */}
          {product.images.length > 0 && !imageError ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800/50">
              <div className="text-slate-600 text-center">
                <Eye className="h-12 w-12 mx-auto mb-2" />
                <span className="text-sm">No Image</span>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`p-2 rounded-full transition-all duration-200 ${
                  product.stock <= 0
                    ? 'bg-slate-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
                } text-white`}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
              
              <button className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-full transition-all duration-200 hover:scale-110 text-white">
                <Heart className="h-5 w-5" />
              </button>
              
              <button className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-full transition-all duration-200 hover:scale-110 text-white">
                <Eye className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stock Status */}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.category && (
            <span className="text-blue-400 text-xs font-medium uppercase tracking-wide">
              {product.category.name}
            </span>
          )}

          {/* Product Name */}
          <h3 className="text-white font-semibold text-lg mt-1 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>

          {/* SKU */}
          <p className="text-slate-500 text-sm mb-2">SKU: {product.sku}</p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold gradient-text">
                ${displayPrice.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-slate-500 line-through text-sm">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Count */}
            <span className={`text-sm ${
              product.stock > 10 
                ? 'text-green-400' 
                : product.stock > 0 
                ? 'text-yellow-400' 
                : 'text-red-400'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}