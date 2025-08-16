'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, X } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  _count: {
    products: number
  }
}

interface ProductFiltersProps {
  categories: Category[]
  searchParams: any
}

export default function ProductFilters({ categories, searchParams }: ProductFiltersProps) {
  const router = useRouter()
  const currentSearchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState({
    min: searchParams.minPrice || '',
    max: searchParams.maxPrice || '',
  })

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(currentSearchParams.toString())
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    // Reset to page 1 when filtering
    params.delete('page')
    
    router.push(`/products?${params.toString()}`)
  }

  const applyPriceFilter = () => {
    const params = new URLSearchParams(currentSearchParams.toString())
    
    if (priceRange.min) {
      params.set('minPrice', priceRange.min)
    } else {
      params.delete('minPrice')
    }
    
    if (priceRange.max) {
      params.set('maxPrice', priceRange.max)
    } else {
      params.delete('maxPrice')
    }
    
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/products')
  }

  const hasActiveFilters = Object.keys(searchParams).some(key => 
    key !== 'page' && searchParams[key]
  )

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center space-x-2 bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-3 rounded-lg transition-colors"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      <div className={`${
        isOpen ? 'block' : 'hidden'
      } lg:block glass rounded-lg p-6 sticky top-24`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>Clear all</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Search Products
          </label>
          <input
            type="text"
            placeholder="Search by name, SKU..."
            defaultValue={searchParams.search || ''}
            className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateFilter('search', e.currentTarget.value || null)
              }
            }}
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Categories
          </label>
          <div className="space-y-2">
            <button
              onClick={() => updateFilter('category', null)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !searchParams.category
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => updateFilter('category', category.slug)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  searchParams.category === category.slug
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{category.name}</span>
                  <span className="text-xs text-slate-500">
                    {category._count.products}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Price Range
          </label>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={applyPriceFilter}
              className="w-full btn-gradient text-white py-2 rounded-lg text-sm font-medium"
            >
              Apply Price Filter
            </button>
          </div>
        </div>

        {/* Quick Price Filters */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Quick Filters
          </label>
          <div className="space-y-2">
            {[
              { label: 'Under $50', max: '50' },
              { label: '$50 - $100', min: '50', max: '100' },
              { label: '$100 - $500', min: '100', max: '500' },
              { label: 'Over $500', min: '500' },
            ].map((filter) => {
              const isActive = 
                searchParams.minPrice === filter.min &&
                searchParams.maxPrice === filter.max
              
              return (
                <button
                  key={filter.label}
                  onClick={() => {
                    const params = new URLSearchParams(currentSearchParams.toString())
                    if (filter.min) params.set('minPrice', filter.min)
                    else params.delete('minPrice')
                    if (filter.max) params.set('maxPrice', filter.max)
                    else params.delete('maxPrice')
                    params.delete('page')
                    router.push(`/products?${params.toString()}`)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Stock Status */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Availability
          </label>
          <div className="space-y-2">
            <button
              onClick={() => updateFilter('inStock', 'true')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                searchParams.inStock === 'true'
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              In Stock Only
            </button>
          </div>
        </div>
      </div>
    </>
  )
}