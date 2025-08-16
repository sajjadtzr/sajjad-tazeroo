import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, Shield, Truck, HeadphonesIcon } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        featured: true,
        active: true,
      },
      include: {
        category: true,
      },
      take: 8,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return products
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      take: 6,
    })
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Discover the
            <span className="gradient-text block">Future of Technology</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Experience premium quality tech products with cutting-edge design. 
            From smartphones to smart homes, we bring you tomorrow's innovation today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="btn-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 group"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/categories"
              className="border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Premium Quality",
      description: "All products undergo rigorous quality testing to ensure excellence."
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Fast Shipping",
      description: "Free shipping on orders over $100 with 2-day delivery options."
    },
    {
      icon: <HeadphonesIcon className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Expert customer support available around the clock for assistance."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "5-Star Reviews",
      description: "Thousands of satisfied customers rate us 5 stars for service and quality."
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Choose TechStore?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We're committed to providing the best technology shopping experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-tech rounded-lg p-6 text-center group">
              <div className="text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoriesSection({ categories }: { categories: any[] }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore our wide range of technology categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="card-tech rounded-lg p-6 group block"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-slate-400 text-sm mb-2">{category.description}</p>
                <p className="text-blue-400 text-sm">
                  {category._count.products} products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProductsSection({ products }: { products: any[] }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium tech products
          </p>
        </div>
        
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No featured products available</p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="btn-gradient text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 group"
          >
            <span>View All Products</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ])

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection categories={categories} />
      
      <Suspense fallback={
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Featured Products
              </h2>
            </div>
            <div className="product-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      }>
        <FeaturedProductsSection products={featuredProducts} />
      </Suspense>
    </div>
  )
}