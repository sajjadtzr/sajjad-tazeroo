'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Search, Zap } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import CartDropdown from './CartDropdown'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCartStore()

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold gradient-text">TechStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-slate-300 hover:text-white transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-slate-300 hover:text-white transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
              <Search className="h-5 w-5 text-slate-400" />
            </button>

            {/* Cart */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors group relative"
              >
                <ShoppingCart className="h-5 w-5 text-slate-400 group-hover:text-slate-300" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium animate-pulse-glow">
                    {itemCount}
                  </span>
                )}
              </button>
              
              {isCartOpen && (
                <CartDropdown onClose={() => setIsCartOpen(false)} />
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-slate-400" />
              ) : (
                <Menu className="h-5 w-5 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-700/50">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/categories" 
                className="text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/about" 
                className="text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile search */}
              <div className="px-4 py-2">
                <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg p-3">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="bg-transparent text-white placeholder-slate-400 focus:outline-none flex-1"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}