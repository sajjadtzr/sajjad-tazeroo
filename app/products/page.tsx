import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import ProductFilters from '@/components/ProductFilters'

interface SearchParams {
  category?: string
  search?: string
  sort?: string
  minPrice?: string
  maxPrice?: string
  page?: string
}

async function getProducts(searchParams: SearchParams) {
  const {
    category,
    search,
    sort = 'newest',
    minPrice,
    maxPrice,
    page = '1',
  } = searchParams

  const limit = 12
  const offset = (parseInt(page) - 1) * limit

  const where: any = {
    active: true,
  }

  // Category filter
  if (category) {
    where.category = {
      slug: category,
    }
  }

  // Search filter
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { sku: { contains: search, mode: 'insensitive' } },
    ]
  }

  // Price filters
  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = parseFloat(minPrice)
    if (maxPrice) where.price.lte = parseFloat(maxPrice)
  }

  // Sorting
  let orderBy: any = { createdAt: 'desc' }
  switch (sort) {
    case 'price-low':
      orderBy = { price: 'asc' }
      break
    case 'price-high':
      orderBy = { price: 'desc' }
      break
    case 'name':
      orderBy = { name: 'asc' }
      break
    case 'featured':
      orderBy = { featured: 'desc' }
      break
    default:
      orderBy = { createdAt: 'desc' }
  }

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
        },
        orderBy,
        take: limit,
        skip: offset,
      }),
      prisma.product.count({ where }),
    ])

    return {
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      products: [],
      total: 0,
      totalPages: 0,
      currentPage: 1,
    }
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

function Pagination({ currentPage, totalPages, searchParams }: {
  currentPage: number
  totalPages: number
  searchParams: SearchParams
}) {
  if (totalPages <= 1) return null

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') {
        params.set(key, value)
      }
    })
    if (page > 1) params.set('page', page.toString())
    const query = params.toString()
    return `/products${query ? `?${query}` : ''}`
  }

  const pages = []
  const maxVisible = 5
  const start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages, start + maxVisible - 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      {currentPage > 1 && (
        <a
          href={createPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-lg transition-colors"
        >
          Previous
        </a>
      )}

      {pages.map((page) => (
        <a
          key={page}
          href={createPageUrl(page)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            page === currentPage
              ? 'btn-gradient text-white'
              : 'bg-slate-800/50 hover:bg-slate-700/50 text-white'
          }`}
        >
          {page}
        </a>
      ))}

      {currentPage < totalPages && (
        <a
          href={createPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-lg transition-colors"
        >
          Next
        </a>
      )}
    </div>
  )
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const [{ products, total, totalPages, currentPage }, categories] = await Promise.all([
    getProducts(searchParams),
    getCategories(),
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Products
        </h1>
        <p className="text-slate-300 text-lg">
          Discover our complete collection of premium technology products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <Suspense fallback={<div className="animate-pulse bg-slate-800/30 rounded-lg h-96"></div>}>
            <ProductFilters categories={categories} searchParams={searchParams} />
          </Suspense>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-300">
              Showing {products.length} of {total} products
            </p>
            
            <div className="flex items-center space-x-4">
              <label className="text-slate-300 text-sm">Sort by:</label>
              <select 
                className="bg-slate-800/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                defaultValue={searchParams.sort || 'newest'}
                onChange={(e) => {
                  const params = new URLSearchParams(window.location.search)
                  params.set('sort', e.target.value)
                  params.delete('page')
                  window.location.href = `/products?${params.toString()}`
                }}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <Suspense fallback={
            <div className="product-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }>
            {products.length > 0 ? (
              <>
                <div className="product-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  searchParams={searchParams}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-400 text-xl mb-4">No products found</p>
                <p className="text-slate-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}